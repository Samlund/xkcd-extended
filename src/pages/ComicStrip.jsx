import ComicCarousel from "@/components/layout/ComicCarousel";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
    api.get("/info.0.json").then((res) => {
      setLatest(res.num);
    });
  }

  function createComicPromises() {
    const promises = [];
    promises.push(
      id > 1
        ? api.get(`/${parseInt(id) - 1}/info.0.json`)
        : Promise.resolve({}),
    );
    promises.push(api.get(`/${parseInt(id)}/info.0.json`));
    if (id < latest) promises.push(api.get(`/${parseInt(id) + 1}/info.0.json`));
    if (id < latest - 2)
      promises.push(api.get(`/${parseInt(id) + 2}/info.0.json`));
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
    <div className="pt-5 px-12 w-[80vw] mx-auto">
      <ComicCarousel
        id={id}
        latest={latest}
        comicList={comicList}
        loading={loading}
      />
    </div>
  );
}

export default ComicStrip;
