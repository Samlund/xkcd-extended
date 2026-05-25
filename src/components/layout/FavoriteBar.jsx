import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Heart } from "lucide-react";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

function FavoriteBar({ id }) {
  function addToFavorites() {
    localStorage.setItem(id, JSON.stringify(inputCategory));
    setIsFavorite(true);
    setDisplayInput(false);
  }

  function loadCategories() {
    const len = localStorage.length;
    const keys = [];
    for (let i = 0; i < len; i++) {
      keys.push(localStorage.key(i));
    }
    const vals = [
      ...new Set(keys.map((key) => JSON.parse(localStorage.getItem(key)))),
    ];
    setCategories(vals);
  }

  function removeFromFavorites() {
    localStorage.removeItem(id);
    setIsFavorite(false);
  }

  function handleToggle() {
    if (isFavorite) removeFromFavorites();
    else {
      loadCategories();
      setDisplayInput(true);
    }
  }

  const [isFavorite, setIsFavorite] = useState(false);
  const [displayInput, setDisplayInput] = useState(false);
  const [inputCategory, setInputCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  function handleInputCategoryChange(category) {
    setInputCategory(category);
  }

  useEffect(() => {
    setIsFavorite(localStorage.getItem(id) !== null);
  });

  return (
    <div className="flex justify-end m-2 sticky top-2 ">
      <Toggle pressed={isFavorite} onPressedChange={handleToggle} size="lg" className="cursor-pointer">
        <Heart className="group-data-[state=on]/toggle:fill-destructive" />
      </Toggle>
      <Dialog open={displayInput}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center">Add favorite</DialogTitle>
            <DialogDescription />
            <Combobox
              items={categories}
              modal={false}
              value={inputCategory}
              onInputValueChange={handleInputCategoryChange}
            >
              <ComboboxInput placeholder="Name of category" />
              <ComboboxContent className="pointer-events-auto">
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Button
              onClick={() => {
                setDisplayInput(false);
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <DialogClose asChild>
              <Button disabled={!inputCategory} onClick={addToFavorites} className="cursor-pointer">
                Submit
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default FavoriteBar;
