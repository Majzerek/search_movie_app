import type { BestMoviesType } from "../../types"


export const BestMovies = ({ setBest, best }: BestMoviesType) => {

  const handleClick = () => {
    setBest(!best)
  }
  return (
    <>
      <button className="btn_pages" disabled={best} onClick={handleClick}>TOP</button>
      <button className="btn_pages" disabled={!best} onClick={handleClick}>All</button>
    </>
  )
}
