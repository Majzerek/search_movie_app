import { createBrowserRouter } from "react-router";
import { FavouritesPage,  MainPage,  MovieSummary, NotFoundPage } from "../pages";


export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />
  },
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/favourites',
    element: <FavouritesPage />
  },
  {
    path: '/movie/:movieId',
    element: <MovieSummary />
  }
])