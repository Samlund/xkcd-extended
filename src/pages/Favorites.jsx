import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { xkcd } from "@/lib/external/xkcd";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Spinner } from "@/components/ui/spinner";
import { Trash2, ChevronsUpDown } from "lucide-react";
import { Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Link } from "react-router";

function Favorites() {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [hiddenCategories, setHiddenCategories] = useState(new Set());
    const [isOpen, setIsOpen] = React.useState(false);

    const [customCategories, setCustomCategories] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("custom_categories")) || [];
        } catch {
            return [];
        }
    });

    const favoritesQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: async () => {
            const keys = Object.keys(localStorage).filter((k) => /^\d+$/.test(k));
            if (keys.length === 0) return [];

            const promises = keys.map(async (id) => {
                const data = await xkcd.getById(id);
                const category = JSON.parse(localStorage.getItem(id));
                return { ...data, category };
            });
            return Promise.all(promises);
        },
    });

    const toggleCategoryVisibility = (category) => {
        const next = new Set(hiddenCategories);
        if (next.has(category)) next.delete(category);
        else next.add(category);
        setHiddenCategories(next);
    };

    const addCategory = () => {
        const name = newCategoryName.trim();
        if (!name || name.toLowerCase() === "uncategorized") {
            setNewCategoryName("");
            return;
        }

        const updatedCategories = Array.from(new Set([...customCategories, name]));
        setCustomCategories(updatedCategories);
        localStorage.setItem("custom_categories", JSON.stringify(updatedCategories));
        setNewCategoryName("");
    };

    const removeCategory = (categoryToRemove) => {
        const comics = favoritesQuery.data || [];
        comics.forEach((comic) => {
            if (comic.category === categoryToRemove) {
                localStorage.setItem(comic.num.toString(), JSON.stringify(null));
            }
        });

        const updatedCategories = customCategories.filter((c) => c !== categoryToRemove);
        setCustomCategories(updatedCategories);
        localStorage.setItem("custom_categories", JSON.stringify(updatedCategories));

        favoritesQuery.refetch();
    };

    const removeFavorite = (id) => {
        localStorage.removeItem(id.toString());
        favoritesQuery.refetch();
    };

    if (favoritesQuery.isPending) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex justify-center items-center flex-grow">
                    <Spinner className="size-8" />
                </div>
            </div>
        );
    }

    const comics = favoritesQuery.data || [];

    const activeCategories = Array.from(
        new Set([
            ...customCategories,
            ...comics.map((c) => c.category).filter((c) => c && c.trim() !== ""),
        ])
    ).filter((cat) => cat !== "Uncategorized");

    const groupedComics = { Uncategorized: [] };
    activeCategories.forEach((cat) => (groupedComics[cat] = []));

    comics.forEach((comic) => {
        const cat = comic.category && comic.category.trim() !== "" ? comic.category : "Uncategorized";
        if (!groupedComics[cat]) groupedComics[cat] = [];
        groupedComics[cat].push(comic);
    });

    return (
        <>
            <main className="flex-1 flex flex-col items-center px-4 pt-6 pb-12 w-full max-w-2xl mx-auto gap-8">
                <div className="w-full bg-card rounded-md px-6 pt-6 pb-2">

                    <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <div className="flex">
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="px-2 self-start text-lg font-semibold mb-4">
                                    Categories
                                    <ChevronsUpDown />
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-2 mb-6">

                                <Input
                                    placeholder="New category name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="max-w-xs"
                                />
                                <Button disabled={!newCategoryName} onClick={addCategory}>Add Category</Button>
                            </div>

                            <div className="flex flex-wrap gap-3 pb-3">
                                <Toggle
                                    pressed={!hiddenCategories.has("Uncategorized")}
                                    onPressedChange={() => toggleCategoryVisibility("Uncategorized")}
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    Uncategorized
                                </Toggle>

                                {activeCategories.map((cat) => (
                                    <div key={cat} className="flex items-center gap-1 rounded-lg pl-1 pr-1">
                                        <Toggle
                                            pressed={!hiddenCategories.has(cat)}
                                            onPressedChange={() => toggleCategoryVisibility(cat)}
                                            variant="default"
                                            className="bg-transparent text-primary hover:bg-muted border-none shadow-none cursor-pointer"
                                        >
                                            {cat}
                                        </Toggle>
                                        <Button
                                            variant="ghost"
                                            size="icon-xs"
                                            onClick={() => removeCategory(cat)}
                                            className="cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                <div className="w-full flex flex-col gap-6">
                    {["Uncategorized", ...activeCategories].map((cat) => {
                        if (hiddenCategories.has(cat)) return null;
                        const catComics = groupedComics[cat];
                        if (!catComics || catComics.length === 0) return null;

                        return (
                            <div key={cat} className="flex flex-col w-full">
                                <h3 className="text-xl font-bold pb-2 text-primary">{cat}</h3>
                                <div className="flex flex-col gap-2">
                                    {catComics.map((comic) => (
                                        <div
                                            key={comic.num}
                                            className="flex flex-row justify-between items-center bg-card rounded-md p-3 hover:bg-muted/50 transition-colors"
                                        >
                                            <Link
                                                to={`/comicstrips/${comic.num}`}
                                                className="flex flex-row items-center gap-4 min-w-0 flex-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                <span className="font-medium truncate">{comic.title}</span>
                                                <span className="text-sm text-muted-foreground shrink-0">#{comic.num}</span>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeFavorite(comic.num)}
                                                className="cursor-pointer ml-4"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {comics.length === 0 && (
                        <div className="text-center text-muted-foreground mt-2">
                            No favorites saved yet.
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Favorites;