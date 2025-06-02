import { useDispatch, useSelector } from "react-redux";
import { decrementPage, incrementPage } from "../../store/inputValue/inputSlice.ts";
import type { RootState } from "../../store/store.ts";
import type { ChangePageType } from "../../types";

export const ChangePage = ({ total }: ChangePageType) => {

  const page = useSelector((state: RootState) => state.inputSearch.page);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (page! < total) return dispatch(incrementPage());
  };
  const handleDecrement = () => {
    if (page! > 1) return dispatch(decrementPage());
  };

  return (
    <p>
      Current Page:
      <button className="btn_pages" onClick={() => handleDecrement()} disabled={page === 1}>-</button>
      {page}
      <button className="btn_pages" onClick={() => handleIncrement()} disabled={page === total}>+</button>
    </p>
  )
}
