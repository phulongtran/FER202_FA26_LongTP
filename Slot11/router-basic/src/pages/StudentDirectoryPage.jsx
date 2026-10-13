
import { useSearchParams } from "react-router-dom";
import STUDENTS from "../data/students";
import "./StudentDirectoryPage.css";
const CLASSES = ["SE20B01", "SE20B02", "SE20B04"];

function StudentDirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc trực tiếp giá trị từ URL, không dùng useState cho bộ lọc.
  const q = searchParams.get("q") ?? "";
  const className = searchParams.get("class") ?? "";

  // Cập nhật hoặc xóa query parameter.
  function updateParam(key, value, replace = false) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const normalizedValue = value.trim();

        if (normalizedValue) {
          next.set(key, normalizedValue);
        } else {
          next.delete(key);
        }

        return next;
      },
      { replace }
    );
  }

  // Tính kết quả trực tiếp khi render.
  const normalizedQuery = q.trim().toLocaleLowerCase("vi");

  const result = STUDENTS.filter((student) => {
    const matchesQuery =
      student.name.toLocaleLowerCase("vi").includes(normalizedQuery) ||
      student.id.toLocaleLowerCase("vi").includes(normalizedQuery);

    const matchesClass =
      !className || student.className === className;

    return matchesQuery && matchesClass;
  });

  function clearFilters() {
    setSearchParams({});
  }

  return (
    <div className="container student-directory py-5">
      <div className="student-heading mb-4">
        <h1>Danh bạ sinh viên FPT University</h1>
        <p className="text-muted mb-0">
          Tìm kiếm sinh viên theo họ tên, mã số sinh viên hoặc lớp.
        </p>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label htmlFor="studentSearch" className="form-label">
                Tìm kiếm sinh viên
              </label>

              <input
                id="studentSearch"
                type="search"
                className="form-control"
                placeholder="Nhập tên hoặc MSSV..."
                value={q}
                onChange={(event) =>
                  updateParam("q", event.target.value, true)
                }
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="classFilter" className="form-label">
                Lớp
              </label>

              <select
                id="classFilter"
                className="form-select"
                value={className}
                onChange={(event) =>
                  updateParam("class", event.target.value)
                }
              >
                <option value="">Tất cả lớp</option>

                {CLASSES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
              >
                Xóa lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Danh sách sinh viên</h2>

        <span className="badge text-bg-primary student-count">
          Tìm thấy {result.length}/{STUDENTS.length} sinh viên
        </span>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">MSSV</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Lớp</th>
                <th scope="col">GPA</th>
              </tr>
            </thead>

            <tbody>
              {result.length > 0 ? (
                result.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.id}</td>
                    <td className="fw-semibold">{student.name}</td>
                    <td>{student.className}</td>
                    <td>{student.gpa.toFixed(1)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    Không có sinh viên phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentDirectoryPage;
