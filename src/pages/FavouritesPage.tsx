import { Link } from "react-router"
import { removeFromLocalStorage } from "../components/utils/helpers/localStorage"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { HeartBtn } from "../components/HeartBtn/HeartBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ButtonNav } from "../components";

export const FavouritesPage = () => {

  const favourite = useSelector((state: RootState) => state.favouriteState.value);
  const dispatch = useDispatch();

  const handleClearFavourites = () => {
    dispatch({ type: 'userFavourites/clearFavourites' });
    removeFromLocalStorage("FAVOURITES");
  };

  return (
    <main className="favourites_page--main">
      <h1>Favourites</h1>
      <div className="controllers">
        <Link to="/" className="favourite_link" title="Go to main page">Go back.</Link>
        <button className="btn_pages" onClick={handleClearFavourites}>Clear favourite</button>
      </div>
      <h3>Here you can find your favourite movies.</h3>

      <ul className="favourite_list">
        {favourite.length > 0 ? (
          favourite.map((fav, i) => (
            <li key={fav.id} className="favourite_item">
              <ButtonNav to={`/movie/${fav.id}`} className="favourite_link">
                {i + 1}. {fav.title} ({fav.year})
              </ButtonNav>
              <HeartBtn title={fav.title} year={fav.year} id={Number(fav.id)} element={<FontAwesomeIcon icon={faX} />} />
            </li>
          ))
        ) : (
          <li>No favourite movies found.</li>
        )}
      </ul>
    </main>
  )
}
