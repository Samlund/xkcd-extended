import { useCallback, useRef } from "react";

function useInfiniteScroll(fetchData, hasMore) {
    const observerRef = useRef(null);
    const callbackRef = useRef();
    callbackRef.current = () => {
        if (hasMore) fetchData();
    }

    return useCallback(node => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        if (node) {
            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0]?.isIntersecting && hasMore) callbackRef.current();
                },
                { rootMargin: "200px" }
            );

            observer.observe(node);
            observerRef.current = observer;
        }
    }, [hasMore]);
}

export default useInfiniteScroll;