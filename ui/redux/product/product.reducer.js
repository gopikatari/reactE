import * as productActions from "../product/product.actions";
const initalState = {
  loading: false,
  errorMessage: "",
  product: {},
  products: [],
};
export const productFeatureKey = "product-info";
export const reducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case productActions.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActions.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case productActions.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    //GET_MENS_PRODUCT_START
    case productActions.GET_MENS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActions.GET_MENS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
      };

    case productActions.GET_MENS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
        products: [],
      };

    //GET_MENS_PRODUCT_END
    //GET Womens Start
    case productActions.GET_WOMENS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActions.GET_WOMENS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        loading: false,
      };
    case productActions.GET_WOMENS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    //GET WOMENS END

    //GET KIDS Start
    case productActions.GET_KIDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActions.GET_KIDS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        loading: false,
      };
    case productActions.GET_KIDS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    //GET SINGLE PRODUCT
    case productActions.GET_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActions.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: payload.product,
        products: [],
      };
    case productActions.GET_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    //CREATE CATEGORIES
    case productActions.CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case productActions.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    //getCategories
    //CREATE CATEGORIES
    case productActions.GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productActions.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: payload.categories,
      };
    case productActions.GET_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    //getcategories by catname
    //CREATE CATEGORIES
    case productActions.GET_PRODUCTS_BY_CAT_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case productActions.GET_PRODUCTS_BY_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
      };
    case productActions.GET_PRODUCTS_BY_CAT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
        products: [],
      };
    default:
      return state;
  }
};
