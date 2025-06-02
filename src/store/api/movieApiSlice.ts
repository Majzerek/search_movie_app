import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN = import.meta.env.VITE_API_TOKEN;

export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    }
  }),
  endpoints: (builder) => {
    return {
      searchMovies: builder.query({
        query: ({ searchTerm, page = 1 }: { searchTerm: string; page?: number }) => ({
          url: "search/movie",
          params: {
            query: searchTerm,
            api_key: API_KEY,
            page: page,
            
          },
        }),
      }),
      searchMovieById: builder.query({
        query: (id: string) => ({
          url: `movie/${id}`,
          params: {
            api_key: API_KEY,
          },
        }),
      }),
    };
  },
});

export const { useSearchMoviesQuery, useSearchMovieByIdQuery } = movieApiSlice;