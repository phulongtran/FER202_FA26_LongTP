
import axios from 'axios';
import * as T from './userTypes';

const API = 'https://jsonplaceholder.typicode.com';

// Action tạo trạng thái request
const fetchUsersRequest = () => ({
  type: T.FETCH_USERS_REQUEST,
});

// Action khi lấy Users thành công
const fetchUsersSuccess = (users) => ({
  type: T.FETCH_USERS_SUCCESS,
  payload: users,
});

// Action khi lấy Users thất bại
const fetchUsersFailure = (error) => ({
  type: T.FETCH_USERS_FAILURE,
  payload: error,
});

// Chọn User
export const selectUser = (id) => ({
  type: T.SELECT_USER,
  payload: id,
});

// Thunk lấy danh sách Users
export const fetchUsers = () => async (dispatch, getState) => {
  // Tránh gọi API nhiều lần nếu đã có dữ liệu
  if (getState().users.items.length > 0) {
    return;
  }

  dispatch(fetchUsersRequest());

  try {
    const response = await axios.get(`${API}/users`);

    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

// Thunk lấy Posts theo User
export const fetchPostsByUser = (userId) => async (dispatch) => {
  dispatch(selectUser(userId));
  dispatch({ type: T.FETCH_POSTS_REQUEST });

  try {
    const response = await axios.get(`${API}/posts`, {
      params: {
        userId: userId,
      },
    });

    dispatch({
      type: T.FETCH_POSTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: T.FETCH_POSTS_FAILURE,
      payload: error.message,
    });
  }
};
