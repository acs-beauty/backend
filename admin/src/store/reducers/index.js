import { combineReducers } from "redux";
import categoriesReducer from './categoriesReducer'

const reducer = combineReducers({
  categoriesReducer,
});

export default reducer;