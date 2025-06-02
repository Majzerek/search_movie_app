/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MovieList } from "./MovieList";

import * as reactRedux from "react-redux";
import * as movieApiSlice from "../../store/api/movieApiSlice";
import type { QueryActionCreatorResult, QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

const mockUseSelector = vi.spyOn(reactRedux, "useSelector");
const mockUseSearchMoviesQuery = vi.spyOn(movieApiSlice, "useSearchMoviesQuery");


vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));
vi.mock("../../store/api/movieApiSlice.ts", () => ({
  useSearchMoviesQuery: vi.fn(),
}));
vi.mock("../index.ts", () => ({
  Loader: () => <div data-testid="loader" />,
  Card: ({ titleHeader }: { titleHeader: string }) => <li>{titleHeader}</li>,
  BestMovies: ({ setBest, best }: { setBest: any; best: boolean }) => (
    <button data-testid="best-movies" onClick={() => setBest(!best)}>
      Best
    </button>
  ),
  ChangePage: ({ total }: { total: number }) => <div data-testid="change-page">{total}</div>,
}));


describe("MovieList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Loader when loading", () => {
    mockUseSelector.mockImplementation((fn: any) =>
      fn({ inputSearch: { value: "batman", page: 1 } })
    );
    mockUseSearchMoviesQuery.mockReturnValue({
      data: {},
      error: null,
      isFetching: true,
      isLoading: false,
      refetch: function (): QueryActionCreatorResult<QueryDefinition<{ searchTerm: string; page?: number; }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, "movieApi">> {
        throw new Error("Function not implemented.");
      }
    });

    render(<MovieList />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders error message when error occurs", () => {
    mockUseSelector.mockImplementation((fn: any) =>
      fn({ inputSearch: { value: "batman", page: 1 } })
    );
    mockUseSearchMoviesQuery.mockReturnValue({
      data: {},
      error: true,
      isFetching: false,
      isLoading: false,
      refetch: function (): QueryActionCreatorResult<QueryDefinition<{ searchTerm: string; page?: number; }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, "movieApi">> {
        throw new Error("Function not implemented.");
      }
    });

    render(<MovieList />);
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it('renders "Start serching!" when no data and empty input', () => {
    mockUseSelector.mockImplementation((fn: any) =>
      fn({ inputSearch: { value: "", page: 1 } })
    );
    mockUseSearchMoviesQuery.mockReturnValue({
      data: [],
      error: null,
      isFetching: false,
      isLoading: false,
      refetch: function (): QueryActionCreatorResult<QueryDefinition<{ searchTerm: string; page?: number; }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, "movieApi">> {
        throw new Error("Function not implemented.");
      }
    });

    render(<MovieList />);
    expect(screen.getByText("Start serching!")).toBeInTheDocument();
  });

  it('renders "No results found" when data.results is empty', () => {
    
    mockUseSelector.mockImplementation((fn: any) =>
      fn({ inputSearch: { value: "batman", page: 1 } })
    );
    mockUseSearchMoviesQuery.mockReturnValue({
      data: { results: [], total_pages: 0 },
      error: null,
      isFetching: false,
      isLoading: false,
      refetch: function (): QueryActionCreatorResult<QueryDefinition<{ searchTerm: string; page?: number; }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, "movieApi">> {
        throw new Error("Function not implemented.");
      }
    });

    render(<MovieList />);
    expect(screen.getByText('No results found for "batman"')).toBeInTheDocument();
  });

  it("renders movie list and controllers when data is present", () => {
    mockUseSelector.mockImplementation((fn: any) =>
      fn({ inputSearch: { value: "batman", page: 1 } })
    );
    mockUseSearchMoviesQuery.mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            title: "Batman Begins",
            overview: "A movie",
            poster_path: "/batman.jpg",
            release_date: "2005-06-15",
            vote_average: 8.2,
          },
          {
            id: 2,
            title: "The Dark Knight",
            overview: "Another movie",
            poster_path: "/darkknight.jpg",
            release_date: "2008-07-18",
            vote_average: 9.0,
          },
        ],
        total_pages: 2,
      },
      error: null,
      isFetching: false,
      isLoading: false,
      refetch: function (): QueryActionCreatorResult<QueryDefinition<{ searchTerm: string; page?: number; }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, "movieApi">> {
        throw new Error("Function not implemented.");
      }
    });

    render(<MovieList />);
    expect(screen.findByText("Movie List")).toBeDefined();
    expect(screen.findByText('Search results for "batman"')).toBeDefined();
    expect(screen.findByText("Pages: 2")).toBeDefined();
    expect(screen.findByText("Batman Begins")).toBeDefined();
    expect(screen.findByText("The Dark Knight")).toBeDefined();

  });
});