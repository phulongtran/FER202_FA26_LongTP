
import axiosClient from './axiosClient';

// NC2 - Tầng service
const postApi = {
  // GET: lấy danh sách bài viết
  getAll: (params = {}, signal) =>
    axiosClient.get('/posts', { params, signal }),

  // GET: lấy một bài viết
  getById: (id, signal) =>
    axiosClient.get(`/posts/${id}`, { signal }),

  // GET: lấy bình luận của bài viết
  getComments: (id, signal) =>
    axiosClient.get(`/posts/${id}/comments`, { signal }),

  // POST: tạo bài viết
  create: (data) =>
    axiosClient.post('/posts', data),

  // PUT: cập nhật toàn bộ bài viết
  update: (id, data) =>
    axiosClient.put(`/posts/${id}`, data),

  // PATCH: cập nhật một phần bài viết
  patch: (id, partial) =>
    axiosClient.patch(`/posts/${id}`, partial),

  // DELETE: xóa bài viết
  remove: (id) =>
    axiosClient.delete(`/posts/${id}`)
};

// API dành cho user, phục vụ bài tiếp theo
export const userApi = {
  getAll: (signal) =>
    axiosClient.get('/users', { signal }),

  getById: (id, signal) =>
    axiosClient.get(`/users/${id}`, { signal })
};

export default postApi;
