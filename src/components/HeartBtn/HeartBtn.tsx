import { addFavourite, removeFavourite } from "../../store/userFavourites/userFavouritesSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { HeartComponentProps } from "../../types";
import { useEffect } from "react";
import { saveToLocalStorage } from "../utils";

export const HeartBtn = ({ id, title, year, element }: HeartComponentProps) => {

  const favourite = useSelector((state: RootState) => state.favouriteState.value);
  const dispatch = useDispatch();

  const handleFavourite = () => {

    const favouriteId = { id: id.toString(), title, year };
    const isFavourite = favourite.some((fav) => fav.id === favouriteId.id);
    if (isFavourite) {
      dispatch(removeFavourite(favouriteId.id));
    } else {
      dispatch(addFavourite(favouriteId));
    }
  };

  useEffect(() => {
    saveToLocalStorage("FAVOURITES", favourite);
  }, [favourite]);

  return (
    <button
      id="btn_favourite"
      className={
        favourite.find(fav => fav.id === id.toString())
          ? "favourite favourite_chosen"
          : "favourite"
      }
      onClick={handleFavourite}
    >
      {element}
    </button>
  );
};
