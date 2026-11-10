
import axios from 'axios';

// Tạo Axios instance
const api = axios.create({
  baseURL: 'http://localhost:9999',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy danh sách sinh viên
export const getStudents = async () => {
  const response = await api.get('/students');
  return response.data;
};

// Thêm sinh viên
export const createStudent = async (student) => {
  const response = await api.post('/students', student);
  return response.data;
};

// Cập nhật sinh viên
export const updateStudent = async (id, student) => {
  const response = await api.put(`/students/${id}`, student);
  return response.data;
};

// Xóa sinh viên
export const deleteStudentById = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};
