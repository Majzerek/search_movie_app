import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { useState, type ChangeEvent, type FormEvent, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSearchMoviesQuery } from "../../store/api/movieApiSlice";

export const SearchBar = () => {

  const inpValue = useSelector((state: RootState) => state.inputSearch.value);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  
  const spinnerIcon = <FontAwesomeIcon icon={faSpinner} spin />;
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.inputSearch.page);

  const { isFetching } = useSearchMoviesQuery({ searchTerm: inpValue, page: page });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setError('');
  };

  const validation = (value: string): boolean => {
    if (value.trim() === '') {
      setError('Please enter a movie name');
      return false;
    }
    if (value.length < 3) {
      setError('Please enter at least 3 characters');
      return false;
    }
    if (value.length > 50) {
      setError('Please enter no more than 50 characters');
      return false;
    }
    if(value === inpValue) {
      setError('You already searched for this movie');
      return false;
    }
    setError('');
    return true;
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validation(searchInput);
    if (!isValid) return;
    dispatch({ type: 'searchInput/setInputValue', payload: searchInput })
    setError(''); 
  };


  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search_input">Movie title:</label>
        <input type="text" name="searchInput" id="search_input" value={searchInput} onChange={handleInputChange} />
        {error && <small className="error">{error}</small>}
        <button type="submit" disabled={error !== ''|| isFetching} >{!isFetching ? "Search" : spinnerIcon }</button>
      </form>
    </div>
  )
}
