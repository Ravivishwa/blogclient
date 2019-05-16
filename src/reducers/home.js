export default (state={articles: [], total: null, current_page: 1,per_page: 5}, action) => {
  console.log("dad",action.data)
  switch(action.type) {    
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.data.data,
        total:action['data']['headers']['x-wp-total'],
        per_page: 5
      };
    case 'SUBMIT_ARTICLE':
      return {
        ...state,
        articles: ([action.data.article]).concat(state.articles),
      };
    case 'DELETE_ARTICLE':
      return {
        ...state,
        articles: state.articles.filter((article) => article._id !== action.id),
      };
    case 'SET_EDIT':
      return {
        ...state,
        articleToEdit: action.article,
      };
    case 'EDIT_ARTICLE':
      return {
        ...state,
        articles: state.articles.map((article) => {
          if(article._id === action.data.article._id) {
            return {
              ...action.data.article,
            }
          }
          return article;
        }),
        articleToEdit: undefined,
      };
      case 'UPDATE_PAGE_LINK':
      return {
        ...state,
        current_page:action.data
      };
      case 'LOAD_CATEGORIES':
      return{
        ...state,
        categories:action.data
      }
    default:
      return state;
  }
};
