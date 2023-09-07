import ACTION from "../actionTypes";

// categories
export const getCategoriesRequest = () => ({
    type: ACTION.GET_CATEGORIES_REQUEST
});

export const getCategoriesSuccess = (data) => ({
    type: ACTION.GET_CATEGORIES_SUCCESS,
    data
});

export const addCategoryRequest = () => ({
    type: ACTION.ADD_CATEGORY_REQUEST
});

export const addCategorySuccess = (data) => ({
    type: ACTION.ADD_CATEGORY_SUCCESS,
    data
});

export const updCategoryRequest = () => ({
    type: ACTION.UPD_CATEGORY_REQUEST

});
export const updCategorySuccess = (id, data) => ({
    type: ACTION.UPD_CATEGORY_SUCCESS,
    id,
    data
});
export const delCategoryRequest = () => ({
    type: ACTION.DEL_CATEGORY_REQUEST

});
export const delCategorySuccess = (id) => ({
    type: ACTION.DEL_CATEGORY_SUCCESS,
    id
    
});








// subcategories 
export const addSubcategoryRequest = (data) => ({
    type: ACTION.ADD_SUBCATEGORY_REQUEST,
    data
});

export const addSubcategorySuccess = (data) => ({
    type: ACTION.ADD_SUBCATEGORY_SUCCESS,
    data
});

// error
export const categoriesError = (err) => ({
    type: ACTION.CATEGORIES_ERROR,
    err
});