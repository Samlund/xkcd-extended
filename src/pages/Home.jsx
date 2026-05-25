import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner.jsx";
import { xkcd } from "@/lib/external/xkcd.js";
import useInfiniteScroll from "@/hooks/useInfiniteScroll.jsx";
import FavoriteBar from "@/components/layout/FavoriteBar.jsx";
import { Fragment } from "react";
import { Button } from "@/components/ui/button.jsx";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Link } from "react-router";
import ScrollToTop from "@/components/layout/ScrollToTop"

function Home() {
    const pageSize = 10;

    const latestQuery = useQuery({
        queryKey: ["comics", "latest"],
        queryFn: () => xkcd.getLatest(),
    });

    const comicsQuery = useInfiniteQuery({
        queryKey: ["comics"],
        queryFn: async ({ pageParam }) => {
            let ids = [];
            for (let i = 0; i < pageSize; ++i) ids.push(pageParam - i);
            ids = ids.filter(id => id > 0);
            return Promise.all(ids.map(id => xkcd.getById(id)));
        },
        initialPageParam: latestQuery.data?.num,
        getNextPageParam: (lastPage) => {
            const lowestId = lastPage[lastPage.length - 1].num;
            return lowestId > 1 ? lowestId - 1 : undefined;
        },
        enabled: latestQuery.isSuccess,
    })

    const hasMore = comicsQuery.hasNextPage && !comicsQuery.isFetchingNextPage;
    const loadRef = useInfiniteScroll(comicsQuery.fetchNextPage, hasMore);

    if (latestQuery.isPending || comicsQuery.isPending) return <Spinner />;

    const comics = comicsQuery.data?.pages.flat() ?? [];

    return (
        <>
            <div className="flex flex-row justify-center gap-2 pt-4">
                <Link to="/comicstrips/1">
                    <Button className="cursor-pointer">
                        <ChevronFirst className="h-4 w-4 translate-y-px"/>
                        Oldest
                    </Button>
                </Link>
                <Link to={`/comicstrips/${latestQuery.data?.num}`}>
                    <Button className="cursor-pointer">
                        Newest
                        <ChevronLast className="h-4 w-4 translate-y-px"/>
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col items-center">
                {comics.map(comic => (
                    <div key={comic.num} className="flex flex-col overflow-auto border-4 m-4 rounded-md">
                        <FavoriteBar id={comic.num} className="sticky top-0 z-10" />
                        <img className="max-w-full h-auto pb-12" src={comic.img} alt="Comic strip" />
                    </div>
                ))}
                {comicsQuery.hasNextPage && <div ref={loadRef} className="h-px" /> }
                {comicsQuery.isFetchingNextPage && <Spinner className="size-7 mb-4" />}
            </div>
            <ScrollToTop />
        </>
    )
}

export default Home;