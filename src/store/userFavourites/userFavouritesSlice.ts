import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../components/utils";

export interface UserFavourite {
  id: string;
  title: string;
  year: string;

}
 interface UserFavouritesState {
  value: UserFavourite[];
}

const saved = getFromLocalStorage("FAVOURITES");
const initialState: UserFavouritesState = {
  value: saved ? saved : [],
};
const userFavouritesSlice = createSlice({
  name: "userFavourites",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const newFavourite: UserFavourite = action.payload;
      if (!state.value.some(favourite => favourite.id === newFavourite.id)) {
        state.value.push(newFavourite);
      }
    },
    removeFavourite: (state, action) => {
      const favouriteToRemove = action.payload;
      state.value = state.value.filter(
        (favourite) => favourite.id !== favouriteToRemove
      );
    },
    clearFavourites: (state) => {
      state.value = [];
    }
  },
});
export const { addFavourite, removeFavourite, clearFavourites } = userFavouritesSlice.actions;
export default userFavouritesSlice.reducer;

