import ACTION from "../actions/actionTypes";

const initialState = {
  categories: [],

  isFetching: false,
  error: null,
};

function categoriesReducer(state = initialState, { type, data }) {
  switch (type) {
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
      return {
        ...state,
        isFetching: false,
        categories: data,
        error: null,
      };
    }
    // ADD CATEGORIES
    case ACTION.ADD_CATEGORY_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.ADD_CATEGORY_SUCCESS: {
      const { categories } = state;
      return {
        ...state,
        isFetching: false,
        categories: [...categories, data],
        error: null,
      };
    }
    // UPD CATEGORIES
    case ACTION.UPD_CATEGORY_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.UPD_CATEGORY_SUCCESS: {
      const { categories } = state;
      const id = categories.findIndex(
        (category) => category.categoryId === data.categoryId
      );
      const updatedCategories = [...categories];
      updatedCategories[id] = data;
      return {
        ...state,
        isFetching: false,
        categories: updatedCategories,
        error: null,
      };
    }
    // DEL CATEGORIES
    case ACTION.DEL_CATEGORY_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.DEL_CATEGORY_SUCCESS: {
      const id = data;
      const { categories } = state;
      const searchIndex = categories.findIndex(
        ({ categoryId }) => categoryId === id
      );
      if (searchIndex > 0) {
        categories.splice(searchIndex, 1);
      }
      return {
        ...state,
        isFetching: false,
        categories: categories,
        error: null,
      };
    }
    // ADD SUBCATEGORIES
    case ACTION.ADD_SUBCATEGORY_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.ADD_SUBCATEGORY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        categories: data,
        error: null,
      };
    }
    // // UPD SUBCATEGORIES
    // case ACTION.UPD_SUBCATEGORY_REQUEST: {
    //   return {
    //     ...state,
    //     isFetching: true,
    //     error: null,
    //   };
    // }
    // case ACTION.UPD_SUBCATEGORY_SUCCESS: {
    //   return {
    //     ...state,
    //     isFetching: false,
    //     categories: data,
    //     error: null,
    //   };
    // }
    // DEL SUBCATEGORIES
    case ACTION.DEL_SUBCATEGORY_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.DEL_SUBCATEGORY_SUCCESS: {
      const subcategoryIdToRemove = data;
      const { categories } = state;
      const updatedCategories = categories.map((category) => ({
        ...category,
        subcategories: category.subcategories.filter(
          (subcategory) => subcategory.subcategoryId !== subcategoryIdToRemove
        ),
      }));
      return {
        ...state,
        isFetching: false,
        categories: updatedCategories,
        error: null,
      };
    }
    // ERROR
    case ACTION.CATEGORIES_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: data,
      };
    }
    default:
      return state;
  }
}

export default categoriesReducer;
