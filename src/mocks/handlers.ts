import { http } from 'msw'


export const handlers = [

  http.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    const query = req.url.searchParams.get('query')
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        results: [
          {
            id: 1,
            title: `Mocked Movie for "${query}"`,
            release_date: '2022-01-01',
            poster_path: '/mocked.jpg',
            overview: 'This is a mocked movie overview.',
            vote_average: 8.1,
          },
        ],
        total_pages: 1,
        total_results: 1,
      })
    )
  }),

  // Mock get movie by ID endpoint
  http.get('https://api.themoviedb.org/3/movie/:movieId', (req, res, ctx) => {
    const { movieId } = req.params
    return res(
      ctx.status(200),
      ctx.json({
        id: movieId,
        title: 'Mocked Movie',
        release_date: '2022-01-01',
        poster_path: '/mocked.jpg',
        overview: 'This is a mocked movie overview.',
        vote_average: 8.1,
        genres: [{ name: 'Action' }, { name: 'Drama' }],
        runtime: 120,
        original_language: 'en',
        production_companies: [{ name: 'Mocked Studio' }],
        vote_count: 1000,
        tagline: 'Mocked Tagline',
        budget: 1000000,
        revenue: 5000000,
      })
    )
  }),
]