import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router";
import Comic from "./Comic";

export function ComicCarousel({ id, comicList, latest, loading }) {
  const navigate = useNavigate();

  function nextComic() {
    if (id < latest) {
      navigate(`/comicstrips/${parseInt(id) + 1}`);
    }
  }
  function previousComic() {
    if (id > 1) {
      navigate(`/comicstrips/${parseInt(id) - 1}`);
    }
  }

  const hasPrevious = !!comicList[0]?.img;
  const hasNext = !!comicList[2]?.img;

  return (
      <Carousel opts={{ watchDrag: false }} className="w-full">
        <CarouselContent className="flex justify-center items-center m-0">
          {hasPrevious && (
              <CarouselItem className="basis-1/5 pl-0">
                <Comic comic={comicList[0]} className="h-[40vh] overflow-hidden" titleClassName="text-sm" />
              </CarouselItem>
          )}

          <CarouselItem className="basis-full lg:basis-3/5 pl-0">
            <Comic comic={comicList[1]} className="h-[80vh] lg:m-4 overflow-auto" />
          </CarouselItem>

          {hasNext && (
              <CarouselItem className="basis-1/5 pl-0 text-sm">
                <Comic comic={comicList[2]} className="h-[40vh] overflow-hidden" titleClassName="text-sm" />
              </CarouselItem>
          )}
        </CarouselContent>

        <CarouselNext
            func={nextComic}
            loading={loading || !hasNext}
            className={`-active:data-[slot=carousel-next]:translate-y-[calc(-50%+1px)] ${hasNext ? "cursor-pointer" : ""}`}
        />
        <CarouselPrevious
            func={previousComic}
            loading={loading || !hasPrevious}
            className={`active:data-[slot=carousel-previous]:translate-y-[calc(-50%+1px)] ${hasPrevious ? "cursor-pointer" : ""}`}
        />
      </Carousel>
  );
}

export default ComicCarousel;