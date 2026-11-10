
import * as T from './userTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,

  selectedId: null,

  posts: [],
  postsLoading: false,
  postsError: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // Bắt đầu lấy danh sách Users
    case T.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Lấy Users thành công
    case T.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    // Lấy Users thất bại
    case T.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Chọn User
    case T.SELECT_USER:
      return {
        ...state,
        selectedId: action.payload,
      };

    // Bắt đầu lấy Posts
    case T.FETCH_POSTS_REQUEST:
      return {
        ...state,
        postsLoading: true,
        postsError: null,
        posts: [],
      };

    // Lấy Posts thành công
    case T.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        posts: action.payload,
      };

    // Lấy Posts thất bại
    case T.FETCH_POSTS_FAILURE:
      return {
        ...state,
        postsLoading: false,
        postsError: action.payload,
      };

    default:
      return state;
  }
}
