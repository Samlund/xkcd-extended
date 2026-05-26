import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router";
import FavoriteBar from "./FavoriteBar";

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

  return (
    <Carousel opts={{ watchDrag: false }} className="w-full">
      <CarouselContent className="flex justify-center items-center m-0">
        {(comicList[0]?.img ?? null) ? (
          <CarouselItem className="basis-1/6 flex flex-col h-[40vh] border-4 pl-0 rounded-md overflow-hidden">
            <FavoriteBar id={comicList[0].num} />
            <div className="flex-1 min-h-0 w-full flex items-center justify-center">
              <img
                src={comicList[0].img}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </CarouselItem>
        ) : (
          <CarouselItem className="basis-1/6 flex items-center justify-center h-[40vh] invisible" />
        )}
        <CarouselItem className="sm:basis-5/5 lg:basis-3/5 flex flex-col overflow-auto h-[80vh] border-4 pl-0 m-4 rounded-md">
          <FavoriteBar id={id} />
          <img
            src={comicList[1].img}
            className="h-auto m-auto"
            id={comicList[1].num}
          />
        </CarouselItem>
        {(comicList[2]?.img ?? null) ? (
          <CarouselItem className="basis-1/6 flex flex-col h-[40vh] border-4 pl-0 rounded-md overflow-hidden">
            <FavoriteBar id={comicList[2].num} />
            <div className="flex-1 min-h-0 w-full flex items-center justify-center">
              <img
                src={comicList[2].img}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </CarouselItem>
        ) : (
          <CarouselItem className="basis-1/6 flex items-center justify-center h-[40vh] invisible" />
        )}
      </CarouselContent>
      {(comicList[2]?.img ?? null) ? (
        <CarouselNext
          func={nextComic}
          loading={loading}
          className="active:data-[slot=carousel-next]:translate-y-[calc(-50%+1px)] cursor-pointer"
        />
      ) : (
        <CarouselNext
          func={nextComic}
          loading={true}
          className="active:data-[slot=carousel-next]:translate-y-[calc(-50%+1px)]"
        />
      )}
      {(comicList[0]?.img ?? null) ? (
        <CarouselPrevious
          func={previousComic}
          loading={loading}
          className="active:data-[slot=carousel-previous]:translate-y-[calc(-50%+1px)] cursor-pointer"
        />
      ) : (
        <CarouselPrevious
          func={previousComic}
          loading={true}
          className="active:data-[slot=carousel-previous]:translate-y-[calc(-50%+1px)]"
        />
      )}
    </Carousel>
  );
}

export default ComicCarousel;
