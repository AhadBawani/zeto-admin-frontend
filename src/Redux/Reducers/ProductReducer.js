import ActionType from "../ActionType";
const productState = {
  Products: null,
  ProdCategory:null,
  query:""
};

const ProductReducer = (state = productState, { type, payload }) => {
  switch (type) {
    case ActionType.PRODUCTS:
      return { ...state, Products: payload };
    case ActionType.CATEGORY:
      return { ...state, ProdCategory: payload };
    case ActionType.SEARCH_QUERY:
      return { ...state, query: payload };
    default:
      return state;
  }
};

export default ProductReducer;
