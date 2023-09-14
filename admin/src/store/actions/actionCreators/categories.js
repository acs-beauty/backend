import ACTION from "../actionTypes";

// categories
export const getCategoriesRequest = () => ({
    type: ACTION.GET_CATEGORIES_REQUEST
});

export const getCategoriesSuccess = (data) => ({
    type: ACTION.GET_CATEGORIES_SUCCESS,
    data
});

export const addCategoryRequest = (data) => {
    return{type: ACTION.ADD_CATEGORY_REQUEST, data}
};

export const addCategorySuccess = (data) => ({
    type: ACTION.ADD_CATEGORY_SUCCESS,
    data
});

export const updCategoryRequest = () => ({
    type: ACTION.UPD_CATEGORY_REQUEST

});
export const updCategorySuccess = (data) => ({
    type: ACTION.UPD_CATEGORY_SUCCESS,
    data
});
export const delCategoryRequest = (id) => ({
    type: ACTION.DEL_CATEGORY_REQUEST,
    data: id

});
export const delCategorySuccess = (res) => ({
    type: ACTION.DEL_CATEGORY_SUCCESS,
    data: res
});

// subcategories 
export const addSubcategoryRequest = (data) => {
    return{type: ACTION.ADD_SUBCATEGORY_REQUEST, data}
   
};

export const addSubcategorySuccess = (data) => ({
    type: ACTION.ADD_SUBCATEGORY_SUCCESS,
    data
});
export const updSubcategoryRequest = () => ({
    type: ACTION.UPD_SUBCATEGORY_REQUEST

});
export const updSubcategorySuccess = (data) => ({
    type: ACTION.UPD_SUBCATEGORY_SUCCESS,
    data
});
export const delSubcategoryRequest = (id) => ({
    type: ACTION.DEL_SUBCATEGORY_REQUEST,
    data: id

});
export const delSubcategorySuccess = (res) => {
    return{
    type: ACTION.DEL_SUBCATEGORY_SUCCESS,
    data: res
}};

// error
export const categoriesError = (err) => ({
    type: ACTION.CATEGORIES_ERROR,
    data: err
});