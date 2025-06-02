import type { CardType } from "../../types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { HeartBtn } from "../HeartBtn/HeartBtn";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export const Card = ({ img, titleHeader, year, id, overview, popularity, isLoad }: CardType) => {

  const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spin />;
  const navigate = useNavigate();

  const handleOpenSummary = (id: number) => {
    const movieId = id.toString();
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      {isLoad ? (
        <div className="card">{spinnerIcon}</div>
      ) : (
        <div className="card" id={id.toString()} title={overview}>
          <div className="card_header" >
            <h3 title={titleHeader}>{titleHeader}</h3>
            <HeartBtn title={titleHeader} id={id} year={year} element={<FontAwesomeIcon icon={faHeart} />} />
          </div>
          <div className="poster" onClick={() => handleOpenSummary(id)}>
            {img.slice(-4) !== "null" ? (
              <img src={img} alt={`Poster from movie: ${titleHeader}`} data-testId='poster_container'/>
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
