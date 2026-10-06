const validateRegister = (values) => {
  const errors = {};

  // Họ tên
  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ tên';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Họ tên phải có ít nhất 3 ký tự';
  }

  // Email
  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = 'Email không đúng định dạng';
  }

  // Mật khẩu
  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu';
  } else if (values.password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  } else if (
    !/[A-Za-z]/.test(values.password) ||
    !/\d/.test(values.password)
  ) {
    errors.password = 'Mật khẩu phải có cả chữ và số';
  }

  // Nhập lại mật khẩu
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  }

  // Số điện thoại
  if (
    values.phone &&
    !/^0\d{9}$/.test(values.phone)
  ) {
    errors.phone =
      'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  }

  // Ngày sinh
  if (values.birthday) {
    const birthday = new Date(values.birthday);
    const today = new Date();

    let age =
      today.getFullYear() - birthday.getFullYear();

    const monthDifference =
      today.getMonth() - birthday.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthday.getDate())
    ) {
      age--;
    }

    if (age < 16) {
      errors.birthday =
        'Bạn phải từ 16 tuổi trở lên';
    }
  }

  // Chuyên ngành
  if (!values.major) {
    errors.major = 'Vui lòng chọn chuyên ngành';
  }

  // Đồng ý điều khoản
  if (!values.agree) {
    errors.agree = 'Bạn cần đồng ý điều khoản';
  }

  return errors;
};

export { validateRegister };