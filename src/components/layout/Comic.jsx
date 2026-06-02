import FavoriteBar from "./FavoriteBar";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

function Comic({ comic, isLink, className, titleClassName }) {
    if (!comic || !comic.img) return null;

    const content = (
        <>
            <div className="flex flex-col pt-2 px-8 text-center">
                <h2 className={cn("text-2xl leading-none tracking-tight", titleClassName)}>
                    {comic.title}
                </h2>
            </div>

            <div className="pt-2 pb-4 px-4 flex-1 min-h-0 w-full flex items-center justify-center">
                <img
                    src={comic.img}
                    alt={comic.alt || comic.title}
                    className="max-w-full h-auto max-h-full object-contain"
                />
            </div>
        </>
    );

    return (
        <div
            className={cn(
                "flex flex-col bg-card text-card-foreground rounded-md relative",
                className
            )}
        >
            <FavoriteBar id={comic.num} className="absolute right-0 top-0" />

            {isLink ? (
                <Link
                    to={`/comicstrips/${comic.num}`}
                >
                    {content}
                </Link>
            ) : (
                <div className="flex flex-col flex-1 min-h-0">
                    {content}
                </div>
            )}
        </div>
    );
}

export default Comic;