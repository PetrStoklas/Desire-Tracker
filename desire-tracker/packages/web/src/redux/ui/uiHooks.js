import { useDispatch } from "react-redux";
import * as uiActions from "./uiActions";

export const useSetSelectedCategory = () => {
  const dispatch = useDispatch();
  return (id) => dispatch({ type: uiActions.SET_SELECTED_CATEGORY, payload: id })
}
