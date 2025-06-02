import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./inputValue/inputSlice";
import userFavouritesReducer from "./userFavourites/userFavouritesSlice";
import { movieApiSlice } from "./api/movieApiSlice";

export const store = configureStore({
  reducer: {
    inputSearch: inputReducer,
    favouriteState: userFavouritesReducer,
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(movieApiSlice.middleware)}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;