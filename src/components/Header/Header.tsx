import { ButtonNav } from "../ButtonNav"


export const Header = () => {
  return (
    <header className='header'>
      <h1>Movie Search App</h1>
      <p>Search for your favourite movies and save them to your favourites!</p>
      <nav className="nav">
        <ButtonNav  id='to_favourites' to={'/favourites'}>
          Go To Favourite
        </ButtonNav>
      </nav>
    </header>
  )
}
