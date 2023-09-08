import { put, call } from "redux-saga/effects";
import actionCreators from "../actions/actionCreators";
import {api} from "../../api";


const {
 
    getCategoriesSuccess,
  
    addCategorySuccess,
    updCategorySuccess,
    delCategorySuccess,

    addSubcategorySuccess,

    categoriesError,
  
  }  = actionCreators;

export function* getCategoriesSaga() {
  try {
    const {data} = yield call(api.getCategories);
    yield put(getCategoriesSuccess(data));
  } catch (err) {
    yield put(categoriesError(err));
  }
}

export function* addCategorySaga({ data: newData }) {
  try {
    const data = yield call(api.addCategory, newData);
    yield put(addCategorySuccess(data));
  } catch (err) {
    yield put(categoriesError(err));
  }
}

export function* updCategorySaga({ data: newData }) {
  try {
    const data = yield call(api.updateCategory, newData);
    yield put(updCategorySuccess(data));
  } catch (err) {
    yield put(categoriesError(err));
  }
}

export function* delCategorySaga({ id }) {
  try {
    yield call(api.deleteCategory, id);
    yield put(delCategorySuccess(id));
  } catch (err) {
    yield put(categoriesError(err));
  }
}
