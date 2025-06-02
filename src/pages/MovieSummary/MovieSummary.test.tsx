/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MovieSummary } from './MovieSummary'


vi.mock('react-router', () => ({
  useParams: () => ({ movieId: '123' }),
}))
vi.mock("../../store/api/movieApiSlice.ts", () => ({
  useSearchMoviesQuery: vi.fn(),
}));

vi.mock('../../components', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
  ButtonNav: ({ to, children }: any) => <a href={to}>{children}</a>,
}))


const mockUseSearchMovieByIdQuery = vi.fn()
vi.mock('../../store/api/movieApiSlice', () => ({
  useSearchMovieByIdQuery: mockUseSearchMovieByIdQuery,
}))


describe('MovieSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Loader when loading', () => {
    mockUseSearchMovieByIdQuery.mockReturnValue({
      data: null,
      error: null,
      isFetching: true,
      isLoading: false,
    })
    render(<MovieSummary />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('renders error message when error', () => {
    mockUseSearchMovieByIdQuery.mockReturnValue({
      data: null,
      error: true,
      isFetching: false,
      isLoading: false,
    })
    render(<MovieSummary />)
    expect(screen.findByText(/something went wrong/i)).toBeDefined();
  })

  it('renders movie summary when data is present', async() => {
    mockUseSearchMovieByIdQuery.mockReturnValue({
      data: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        poster_path: '/poster.jpg',
        overview: 'A test movie.',
        vote_average: 8.5,
        genres: [{ name: 'Action' }, { name: 'Drama' }],
        runtime: 120,
        original_language: 'en',
        production_companies: [{ name: 'Test Studio' }],
        vote_count: 1000,
        tagline: 'Test Tagline',
        budget: 1000000,
        revenue: 5000000,
      },
      error: null,
      isFetching: false,
      isLoading: false,
    })
    render(<MovieSummary />)
    expect(screen.findByText(/movie summary/i)).toBeDefined();
    expect(screen.findByText(/test movie/i)).toBeDefined();
    expect(screen.findByText(/2022/)).toBeDefined();
    expect(screen.findByText(/A test movie\./i)).toBeDefined();
    expect(screen.findByText(/Action, Drama/)).toBeDefined();
    expect(screen.findByText(/Test Studio/)).toBeDefined();
    expect(screen.findByText(/Test Tagline/)).toBeDefined();
    expect(screen.findByText(/\$1,000,000/)).toBeDefined();
    expect(screen.findByText(/\$5,000,000/)).toBeDefined();
    expect(await screen.findByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(await screen.findByRole('link', { name: /favourite/i })).toHaveAttribute('href', '/favourites')
  })
})