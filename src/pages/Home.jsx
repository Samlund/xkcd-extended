import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner.jsx";
import { xkcd } from "@/lib/external/xkcd.js";
import useInfiniteScroll from "@/hooks/useInfiniteScroll.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Repeat } from "lucide-react";
import ScrollToTop from "@/components/layout/ScrollToTop";
import LoadingState from "@/components/layout/LoadingState.jsx";
import Comic from "@/components/layout/Comic.jsx";

function Home() {
    const [reversed, setReversed] = useState(false);
    const pageSize = 10;

    const latestQuery = useQuery({
        queryKey: ["comics", "latest"],
        queryFn: () => xkcd.getLatest(),
    });
    const latestId = latestQuery.data?.num;

    const comicsQuery = useInfiniteQuery({
        queryKey: ["comics", reversed ? "asc" : "desc"],
        queryFn: async ({ pageParam }) => {
            let ids = [];
            for (let i = 0; i < pageSize; ++i) ids.push(reversed ? pageParam + i : pageParam - i);
            ids = ids.filter(id => id > 0);
            return Promise.all(ids.map(id => xkcd.getById(id)));
        },
        initialPageParam: reversed ? 1 : latestId,
        getNextPageParam: (lastPage) => {
            if (reversed) {
                const highestId = lastPage[lastPage.length - 1].num;
                return highestId < latestId ? highestId + 1 : undefined;
            } else {
                const lowestId = lastPage[lastPage.length - 1].num;
                return lowestId > 1 ? lowestId - 1 : undefined;
            }
        },
        enabled: latestQuery.isSuccess,
        placeholderData: keepPreviousData,
    });

    const hasMore = comicsQuery.hasNextPage && !comicsQuery.isFetchingNextPage;
    const loadRef = useInfiniteScroll(comicsQuery.fetchNextPage, hasMore);

    if (latestQuery.isPending || comicsQuery.isPending) return <LoadingState />;

    const comics = comicsQuery.data?.pages.flat() ?? [];

    return (
        <>
            <div className="flex flex-row justify-center pt-4">
                <Button className="cursor-pointer" onClick={() => setReversed(reversed => !reversed)}>
                    <Repeat className="translate-y-px"/>
                    Reverse
                </Button>
            </div>
            <div className="flex flex-col items-center px-1">
                {comics.map(comic => (
                    <Comic
                        key={comic.num}
                        comic={comic}
                        isLink
                        className="m-4 w-full max-w-3xl overflow-auto"
                    />
                ))}
                {comicsQuery.hasNextPage && <div ref={loadRef} className="h-px" /> }
                {comicsQuery.isFetchingNextPage && <Spinner className="size-7 mb-4" />}
            </div>
            <ScrollToTop />
        </>
    )
}

export default Home;