
export const courses = [
  {
    code: "PRF192",
    name: "Programming Fundamentals",
    credits: 3,
    semester: 1,
    desc: "Môn học giới thiệu các kiến thức lập trình cơ bản, thuật toán, biến, kiểu dữ liệu, câu lệnh điều kiện, vòng lặp và hàm.",
  },
  {
    code: "WED201c",
    name: "Web Design",
    credits: 3,
    semester: 2,
    desc: "Môn học cung cấp kiến thức về HTML, CSS và JavaScript để xây dựng giao diện website.",
  },
  {
    code: "PRO192",
    name: "Object-Oriented Programming",
    credits: 3,
    semester: 2,
    desc: "Môn học tập trung vào lập trình hướng đối tượng, lớp, đối tượng, tính đóng gói, kế thừa và đa hình.",
  },
  {
    code: "FER202",
    name: "Front-End Development with React",
    credits: 3,
    semester: 3,
    desc: "Môn học giúp sinh viên xây dựng giao diện web bằng React, quản lý state, sử dụng props, hooks và React Router.",
  },
  {
    code: "SWP391",
    name: "Software Project",
    credits: 5,
    semester: 5,
    desc: "Môn học thực hành phát triển một dự án phần mềm theo nhóm, từ phân tích yêu cầu đến thiết kế, lập trình và kiểm thử.",
  },
];

export function findCourse(code) {
  return courses.find(
    (course) => course.code.toLowerCase() === code.toLowerCase()
  );
}
