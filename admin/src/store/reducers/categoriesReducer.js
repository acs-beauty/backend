import ACTION from "../actions/actionTypes";

const initialState = {
  categories: [],
  isFetching: false,
  error: null,
};

function novaPostReducers(state = initialState, action) {
  switch (action.type) {
    // REQUEST
    case ACTION.GET_CATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    // SUCCESS
    case ACTION.GET_CATEGORIES_SUCCESS: {
        const {data} = action;
      return {
        ...state,
        isFetching: false,
        categories: data,
        error: null,
      };
    }
    // ADD CATEGORIES
    case ACTION.ADD_CATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.ADD_CATEGORIES_SUCCESS: {
        const {data} = action;
        const {categories} = state;
      return {
        ...state,
        isFetching: false,
        categories: [...categories, data],
        error: null,
      };
    }
    // UPD CATEGORIES
    case ACTION.UPD_CATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.UPD_CATEGORIES_SUCCESS: {
        const {updatedData} = action;
        const {categories} = state;
        const id = categories.findIndex(category => category.id === updatedData.id)
        const updatedCategories = [...categories];
        updatedCategories[id] = updatedData;
      return {
        ...state,
        isFetching: false,
        categories: updatedCategories,
        error: null,
      };
    }
    // DEL CATEGORIES
    case ACTION.DEL_CATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.DEL_CATEGORIES_SUCCESS: {
        const {id} = action;
        const {categories} = state;
        const updatedCategories = [...categories];
        updatedCategories.splice(updatedCategories.findIndex(category => category.id === id), 1);
      return {
        ...state,
        isFetching: false,
        categories: updatedCategories,
        error: null,
      };
    }
    // ADD SUBCATEGORIES
    case ACTION.ADD_SUBCATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.ADD_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        categories: action.data,
        error: null,
      };
    }
    // UPD SUBCATEGORIES
    case ACTION.UPD_SUBCATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.UPD_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        categories: action.data,
        error: null,
      };
    }
    // DEL SUBCATEGORIES
    case ACTION.DEL_SUBCATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.DEL_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        categories: action.data,
        error: null,
      };
    }
    // ERROR
    case ACTION.CATEGORIES_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default novaPostReducers;
