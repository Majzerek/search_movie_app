import { useSearchMovieByIdQuery } from '../../store/api/movieApiSlice';
import { useParams } from 'react-router'
import { ButtonNav, Loader } from '../../components';

export const MovieSummary = () => {
  
  const id = useParams().movieId as string;
  const { data, error, isFetching, isLoading } = useSearchMovieByIdQuery(id);
  const loading = isFetching || isLoading;

  return (
    <main className="movie_summary--main">
      {loading && <Loader />}
      {error && <p>Something went wrong!</p>}
      {data && (
        <>
          <header className="controllers">
            <h1 className='summary_title'>Movie Summary</h1>
            <p className='summary_subtitle'>Enjoy!</p>
            <nav className='nav'>
              <ButtonNav to="/" title="Go to main page">Home</ButtonNav>
              <ButtonNav to='/favourites' title="Go to favourite page">Favourite</ButtonNav>
            </nav>
          </header>
          <section className="summary_data--section">
            <h2>{data.title} ({data.release_date.slice(0, 4)})</h2>
            <img className='summary_img' src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
            <h3 title={data.overview}>{data.overview}</h3>
            <div className='summary_data--container'>
              <p><strong>Popularity:</strong> <span>{data.vote_average}</span></p>
              <p><strong>Release Date:</strong> {data.release_date}</p>
              <p><strong>Genres:</strong> {data.genres.map((genre: { name: string; }) => genre.name).join(', ')}</p>
              <p><strong>Runtime:</strong> {data.runtime} minutes</p>
              <p><strong>Original Language: </strong> {data.original_language}</p>
              <p><strong>Production Companies:</strong> {data.production_companies.map((company: { name: string; }) => company.name).join(', ')}</p>
              <p><strong>Vote Count:</strong> {data.vote_count}</p>
              <p><strong>Tagline:</strong> {data.tagline}</p>
              <p><strong>Budget:</strong> ${data.budget.toLocaleString()}</p>
              <p><strong>Revenue:</strong> ${data.revenue.toLocaleString()}</p>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
