import ActionType from "../ActionType";
const productState = {
  Products: null,
  seller:null,
  seller_review:JSON.parse(localStorage.getItem('review'))||[],
  ProdCategory:null,
  seller_detail:JSON.parse(localStorage.getItem("seller"))||{
    name:"Guest",
    photo:null,
  },
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
    case ActionType.SELLER:
      return { ...state, seller: payload };
    case ActionType.SELLER_DETAIL:
      return { ...state, seller_detail: payload };
    case ActionType.REVIEW_ACTION:
      
      return { ...state, seller_review: payload };
    default:
      return state;
  }
};

export default ProductReducer;
