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
        <CarouselItem className="basis-1/6 flex items-center justify-center h-[40vh] border-4 pl-0 rounded-md">
          {comicList[0].img ? (
            <img
              src={comicList[0].img}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div></div>
          )}
        </CarouselItem>
        <CarouselItem className="sm:basis-5/5 lg:basis-3/5 flex flex-col overflow-auto h-[80vh] border-4 pl-0 m-4 rounded-md">
          <FavoriteBar id={id} className="sticky top-0 z-10"/>
          <img
            src={comicList[1].img}
            className="h-auto m-auto"
            id={comicList[1].num}
          />
        </CarouselItem>
        <CarouselItem className="basis-1/6 flex items-center justify-center h-[40vh] border-4 pl-0 rounded-md">
          {comicList[2]?.img ? (
            <img
              src={comicList[2].img}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div></div>
          )}
        </CarouselItem>
      </CarouselContent>
      <CarouselNext func={nextComic} loading={loading} />
      <CarouselPrevious func={previousComic} loading={loading} />
    </Carousel>
  );
}

export default ComicCarousel;
