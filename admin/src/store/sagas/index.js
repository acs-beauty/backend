import { takeEvery } from "redux-saga/effects";
import ACTION from "../actions/actionTypes";
import {
  getCategoriesSaga,
  addCategorySaga,
  updCategorySaga,
  delCategorySaga,
  addSubcategorySaga,
} from "./categoriesSaga";

function* rootSaga() {
  yield takeEvery(ACTION.GET_CATEGORIES_REQUEST, getCategoriesSaga);
  yield takeEvery(ACTION.ADD_CATEGORY_REQUEST, addCategorySaga);
  yield takeEvery(ACTION.UPD_CATEGORY_REQUEST, updCategorySaga);
  yield takeEvery(ACTION.DEL_CATEGORY_REQUEST, delCategorySaga);

  yield takeEvery(ACTION.ADD_SUBCATEGORY_REQUEST, addSubcategorySaga);
}
export default rootSaga;
