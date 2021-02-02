import * as uiActions from "./uiActions";

const initialState = {
  selectedCategory: ""
}

const uiReducer = (state = initialState, action) => {
  if (action.type === uiActions.SET_SELECTED_CATEGORY) {
    console.log(action)
    return { ...state, selectedCategory: action.payload }
  } else {
    return state
  }
}

export default uiReducer;
