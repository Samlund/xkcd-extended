import ComicCarousel from "@/components/layout/ComicCarousel";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { xkcd } from "@/lib/external/xkcd.js";
import Navbar from "@/components/layout/Navbar";

function ComicStrip({ params }) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [comicList, setComicList] = useState(null);
  const [latest, setLatest] = useState(0);

  function routeToRandom() {
    const randomId = Math.floor(Math.random() * latest + 1);
    navigate(`/comicstrips/${randomId}`);
  }

  function cacheComics(comics) {
    comics.forEach((comic) => {
      new Image().src = comic.img;
    });
  }

  function setLatestComicNumber() {
    xkcd.getLatest().then((res) => {
      setLatest(res.num);
    });
  }

  function createComicPromises() {
    const promises = [];
    promises.push(
      id > 1 ? xkcd.getById(parseInt(id) - 1) : Promise.resolve({}),
    );
    promises.push(xkcd.getById(id));
    if (id < latest) promises.push(xkcd.getById(parseInt(id) + 1));
    if (id < latest - 2) promises.push(xkcd.getById(parseInt(id) + 2));
    return promises;
  }

  useEffect(() => {
    setLatestComicNumber();
  }, []);

  useEffect(() => {
    async function effect() {
      setLoading(true);
      const comics = await Promise.all(createComicPromises());
      cacheComics(comics);
      setComicList(comics);
      setLoading(false);
    }

    if (!latest) {
      return;
    }
    if (!id) {
      routeToRandom();
    } else {
      effect();
    }
  }, [id, latest]);

  if (!comicList) return <Spinner />;

  return (
    <div className="flex flex-col">
      <div className="pt-5 px-12 w-[98vw] mx-auto">
        <ComicCarousel
          id={id}
          latest={latest}
          comicList={comicList}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ComicStrip;
