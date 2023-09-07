import { put } from "redux-saga/effects";
import {
    getCategoriesRequest,
    getCategoriesSuccess,

    addCategoryRequest,
    addCategorySuccess,

    addSubcategoryRequest,
    addSubcategorySuccess,

    categoriesError
} from "../actions/actionCreators";
import * as api from '../../api';
import { updCategorySuccess } from '../actions/actionCreators/categories';

export function * getCategoriesSaga(){
    yield put(getCategoriesRequest());
    try{
        const{
            data: {data}
        } = yield api.getCategories();
        //console.log('heroes:',data);
        yield put(getCategoriesSuccess(data));
    } catch(err){
       yield put(categoriesError(err));
    }
}

export function * addCategorySaga({data: newData}){
    yield put(addCategoryRequest());
    try{
        const{
            data: {data}
        } = yield api.addCategory(newData);
        yield put(addCategorySuccess(data));
    } catch(err){
       yield put(categoriesError(err));
    }
}

export function * updCategorySaga({data: newData, id}){
    yield put(updCategoryRequest());
    try {
        const{ 
            data: {data}, id
        } = yield api.updateCategory({newData, id});
        yield put(updCategorySuccess(data, id));
    } catch(err){
        yield put(categoriesError(err));
    }
}

export function * delCategorySaga({id}){
    yield put(delCategoryRequest());
    try{
        yield api.deleteCategory(id);
        yield put(delCategorySuccess(id));
    } catch(err){
       yield put(categoriesError(err));
    }
}

