import type { CardType } from "../../types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { addFavorite, removeFavorite } from "../../store/userFavorites/userFavoritesSlice"
import { saveToLocalStorage } from "../../helpers/localStorage"
import { useEffect } from "react"

export const Card = ({ img, titleHeader, year, id, overview, popularity, isLoading }: CardType) => {
  

  const element = <FontAwesomeIcon icon={faHeart} />
  const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spin />;
  const favorite = useSelector((state: RootState) => state.favoriteState.value);
  const dispatch = useDispatch();


  const handleFavorite = (id: number, title: string, year: string) => {

    const favoriteId = { id: id.toString(), title, year };
    const isFavorite = favorite.some((fav) => fav.id === favoriteId.id);
    if (isFavorite) {
      dispatch(removeFavorite(favoriteId.id));
    } else {
      dispatch(addFavorite(favoriteId));
    }
  };
  const handleOpenSummary = (id: number) => {
    const movieId = id.toString();
    // Navigate to the movie summary page
    window.location.href = `/movie/${movieId}`;
  }


  useEffect(() => {
    saveToLocalStorage("FAVORITES", favorite);
  }, [favorite]);


  return (
    <>
      {isLoading ? (
        <div className="card">{spinnerIcon}</div>
      ) : (
        <div className="card" id={id.toString()} title={overview}>
          <div className="card_header">
            <h3 title={titleHeader}>{titleHeader}</h3>
            <span
              id="btn_favorite"
              className={
                favorite.find(fav => fav.id === id.toString())
                  ? "favorite favorite_chosen"
                  : "favorite"
              }
              onClick={() => handleFavorite(id, titleHeader, year)}
            >
              {element}
            </span>
          </div>
          <div className="poster" onClick={() => handleOpenSummary(id)}>
            {img.slice(-4) !== "null" ? (
              <img src={img} alt={`Poster from movie: ${titleHeader}`} />
            ) : (
              "No poster available"
            )}
          </div>
          <small>
            {year} Score: {Math.round(popularity ? popularity : 0)}
          </small>
        </div>
      )}
    </>
  );
}
