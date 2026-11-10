
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import {
  getStudents,
  createStudent,
  updateStudent as updateStudentApi,
  deleteStudentById,
} from '../../api/studentApi';

// Lấy thông báo lỗi
const errMsg = (err) =>
  err.response?.data?.message || err.message || 'Có lỗi xảy ra';

// ================= THUNKS =================

// GET: Lấy danh sách sinh viên
export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getStudents();
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

// POST: Thêm sinh viên
export const addStudent = createAsyncThunk(
  'students/add',
  async (student, { getState, rejectWithValue }) => {
    const exists = getState().students.items.some(
      (s) => s.code.toLowerCase() === student.code.toLowerCase()
    );

    if (exists) {
      return rejectWithValue(`Mã sinh viên ${student.code} đã tồn tại`);
    }

    try {
      return await createStudent(student);
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

// PUT: Cập nhật sinh viên
export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      return await updateStudentApi(id, { id, ...data });
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

// DELETE: Xóa sinh viên
export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentById(id);
      return id;
    } catch (err) {
      return rejectWithValue(errMsg(err));
    }
  }
);

// ================= SLICE =================

const studentsSlice = createSlice({
  name: 'students',

  initialState: {
    items: [],
    status: 'idle',
    saving: false,
    error: null,
    keyword: '',
    sortBy: 'code',
  },

  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },

    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // ADD
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.saving = false;
      })

      // UPDATE
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }

        state.saving = false;
      })

      // DELETE
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (s) => s.id !== action.payload
        );

        state.saving = false;
      })

      // Xử lý chung khi CRUD đang chạy
      .addMatcher(
        isPending(addStudent, updateStudent, deleteStudent),
        (state) => {
          state.saving = true;
          state.error = null;
        }
      )

      // Xử lý chung khi CRUD thất bại
      .addMatcher(
        isRejected(addStudent, updateStudent, deleteStudent),
        (state, action) => {
          state.saving = false;
          state.error = action.payload || action.error.message;
        }
      );
  },
});

// Export actions
export const {
  setKeyword,
  setSortBy,
  clearError,
} = studentsSlice.actions;

export default studentsSlice.reducer;

// ================= SELECTORS =================

export const selectStudentsState = (state) => state.students;

const selectItems = (state) => state.students.items;
const selectKeyword = (state) => state.students.keyword;
const selectSortBy = (state) => state.students.sortBy;

// Lọc và sắp xếp sinh viên
export const selectVisibleStudents = createSelector(
  [selectItems, selectKeyword, selectSortBy],
  (items, keyword, sortBy) => {
    const kw = keyword.trim().toLowerCase();

    const filtered = kw
      ? items.filter(
          (s) =>
            s.name.toLowerCase().includes(kw) ||
            s.code.toLowerCase().includes(kw)
        )
      : items;

    return [...filtered].sort((a, b) =>
      sortBy === 'gpa'
        ? b.gpa - a.gpa
        : String(a[sortBy]).localeCompare(String(b[sortBy]), 'vi')
    );
  }
);

// Tính GPA trung bình
export const selectAverageGpa = createSelector(
  [selectItems],
  (items) =>
    items.length
      ? (
          items.reduce((sum, student) => sum + Number(student.gpa), 0) /
          items.length
        ).toFixed(2)
      : '0.00'
);
