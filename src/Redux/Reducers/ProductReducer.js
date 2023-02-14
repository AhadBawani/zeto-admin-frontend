import ActionType from "../ActionType";
const productState = {
  Products: null,
  subCategory: [],
  all_seller: null,
  seller_data: JSON.parse(localStorage.getItem('sellerData')) || [],
  ProdCategory: null,
  query: ""
};

const ProductReducer = (state = productState, { type, payload }) => {
  switch (type) {
    case ActionType.PRODUCTS:
      return { ...state, Products: payload };
    case ActionType.CATEGORY:
      return { ...state, ProdCategory: payload };
    case ActionType.SEARCH_QUERY:
      return { ...state, query: payload };
    case ActionType.ALL_SELLER:
      return { ...state, all_seller: payload };
    case ActionType.SUBCATEGORY:
      return { ...state, subCategory: payload };
    case ActionType.SELLER_DATA:
      return { ...state, seller_data: payload };
    default:
      return state;
  }
};

export default ProductReducer;
