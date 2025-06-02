import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { movieApiSlice } from "../../store/api/movieApiSlice.ts";
import inputReducer from "../../store/inputValue/inputSlice.ts";
import userFavouritesReducer from '../../store/userFavourites/userFavouritesSlice.ts';
import { MainPage } from "./MainPage.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    inputSearch: inputReducer,
    favouriteState: userFavouritesReducer,
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApiSlice.middleware),
});

describe("MainPage render", () => {

  const setup = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it("should render all components corectly",async () => {
    setup();
    const title = screen.getByText("Movie Search App");
    const text = screen.getByText("Search for your favourite movies and save them to your favourites!");
    const buttonNav = screen.getByRole('button', {name: "Go To Favourite"})

    expect(title).toBeDefined();
    expect(text).toBeDefined();
    expect(buttonNav).toBeDefined();
  });

});