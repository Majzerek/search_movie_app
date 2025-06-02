import { useSelector } from "react-redux";
import { useSearchMoviesQuery } from "../../store/api/movieApiSlice.ts";
import type { RootState } from "../../store/store.ts";
import type { MovieType } from "../../types/index.ts";
import { BestMovies, Card, ChangePage, Loader } from "../index.ts";
import { useState } from "react";


export const MovieList = () => {

  const JPG_URL = "https://image.tmdb.org/t/p/w500"
  const inpValue = useSelector((state: RootState) => state.inputSearch.value);
  const page = useSelector((state: RootState) => state.inputSearch.page);
  const [best,setBest] = useState<boolean>(false);

  // Fetching movies based on the search term and page number
  // The useSearchMoviesQuery hook is used to fetch movies from the API
  const { data, error, isFetching, isLoading } = useSearchMoviesQuery({ searchTerm: inpValue, page: page });
  const loading = isFetching || isLoading;

  if (loading) return <Loader />;
  if (error) return <section className="center">{error ? "Something went wrong!" : ''}</section>;
  if (!data.length && inpValue === '') return <section className="center">Start serching!</section>;
  if (data.results.length === 0) return <section className="center">No results found for "{inpValue}"</section>;

 
  const bestMovie = best 
  ? data.results.filter((movie: MovieType) => movie.vote_average >= 7).sort((a: MovieType, b: MovieType) => b.vote_average - a.vote_average) 
  : data.results;

  return (

    <section className="center movie_list--section">
      <h4 className="list_title">Movie List</h4>
      
      {inpValue !== '' &&
        <div className="controllers">
          <p className="list_subtitle">Search results for "{inpValue}"</p>
          <p>Pages: {data.total_pages}</p>
          <BestMovies setBest={setBest} best={best}/>
          <ChangePage total={data.total_pages} />
        </div>
      }
      <ul className="movie_list">
        {bestMovie.map((movie: MovieType) => (
          <Card
            key={movie.id}
            overview={movie.overview}
            img={`${JPG_URL}${movie.poster_path}`}
            id={movie.id} titleHeader={movie.title}
            year={movie.release_date.slice(0, 4)}
            popularity={movie.vote_average}
            isLoad={loading}
          />
        ))}
      </ul>
    </section>
  )
}
