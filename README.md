# Free Movie Search

A React application to search and view movie details.
Using localStorage to save movies locally.

## Features
- Using free api from TMDB API from `https://www.themoviedb.org/`
- Need a token, api_key and this link `https://api.themoviedb.org/3/` to make it work.
- Search for movies
- View movie details and posters
- Mark favorites with a heart button

## Getting Started 
- vite
- react
- typescript
- using react-router
- redux
- rtk query

## Using Redux and RTK Query

```javascript
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
```

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/Majzerek/search_movie_app.git
cd freeMovieSearch
npm install
```

### Running Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Running with Docker

```bash
docker compose up --build
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Running Tests

```bash
npm test
```
*(Uses [Jest](https://jestjs.io/) or your test runner here)*
setupTests.ts:
```javascript
import "@testing-library/jest-dom";
import { afterAll, beforeAll, afterEach } from "vitest";
import { server } from "./mocks/server";


beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

```
## Project Structure

- `src/components/` – React components
- `src/types/` – TypeScript types
- `src/App.tsx` – Router
- `src/pages/MainPage.tsx` –  Main app entry

## License

MIT
