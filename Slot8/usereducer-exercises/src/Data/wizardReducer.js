export const COURSES = [
  {
    id: "react",
    name: "ReactJS cơ bản",
    fee: 2500000,
  },
  {
    id: "node",
    name: "NodeJS & Express",
    fee: 3000000,
  },
  {
    id: "fullstack",
    name: "Fullstack MERN",
    fee: 5000000,
  },
];

export const SCHEDULES = [
  "Sáng 2-4-6",
  "Tối 3-5-7",
  "Cuối tuần",
];

export const STEPS = [
  "Thông tin",
  "Khóa học",
  "Xác nhận",
];

export const STEP_FIELDS = [
  ["fullName", "email", "phone"],
  ["courseId", "schedule"],
  ["confirmed"],
];

export const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  courseId: "react",
  schedule: "",
  confirmed: false,
};

export const validateField = (name, values) => {
  switch (name) {
    case "fullName":
      if (!values.fullName.trim()) {
        return "Vui lòng nhập họ tên";
      }

      if (values.fullName.trim().length < 3) {
        return "Họ tên phải có ít nhất 3 ký tự";
      }

      return "";

    case "email":
      if (!values.email.trim()) {
        return "Vui lòng nhập email";
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(values.email.trim())) {
        return "Email không đúng định dạng";
      }

      return "";

    case "phone":
      if (!values.phone.trim()) {
        return "Vui lòng nhập số điện thoại";
      }

      const phoneRegex = /^0\d{9}$/;

      if (!phoneRegex.test(values.phone)) {
        return "Số điện thoại phải gồm 10 số và bắt đầu bằng 0";
      }

      return "";

    case "courseId":
      if (!values.courseId) {
        return "Vui lòng chọn khóa học";
      }

      return "";

    case "schedule":
      if (!values.schedule) {
        return "Chọn lịch học";
      }

      return "";

    case "confirmed":
      if (!values.confirmed) {
        return "Vui lòng xác nhận thông tin";
      }

      return "";

    default:
      return "";
  }
};

export const validateStep = (step, values) => {
  return STEP_FIELDS[step].reduce(
    (errors, fieldName) => {
      const error = validateField(
        fieldName,
        values
      );

      if (error) {
        errors[fieldName] = error;
      }

      return errors;
    },
    {}
  );
};

export const initWizard = (initialCourseId = "react") => {
  const validCourse = COURSES.some(
    (course) => course.id === initialCourseId
  );

  return {
    step: 0,
    maxVisited: 0,

    values: {
      ...initialValues,
      courseId: validCourse
        ? initialCourseId
        : "react",
    },

    errors: {},
    submitted: false,
  };
};

export const wizardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      const { name, value } = action.payload;

      const newValues = {
        ...state.values,
        [name]: value,
      };

      let newErrors = state.errors;

      if (state.errors[name]) {
        const error = validateField(
          name,
          newValues
        );

        newErrors = {
          ...state.errors,
          [name]: error,
        };

        if (!error) {
          delete newErrors[name];
        }
      }

      return {
        ...state,
        values: newValues,
        errors: newErrors,
        submitted: false,
      };
    }

    case "NEXT": {
      const errors = validateStep(
        state.step,
        state.values
      );

      if (Object.keys(errors).length > 0) {
        return {
          ...state,
          errors,
        };
      }

      const nextStep = Math.min(
        state.step + 1,
        STEPS.length - 1
      );

      return {
        ...state,
        step: nextStep,
        maxVisited: Math.max(
          state.maxVisited,
          nextStep
        ),
        errors: {},
      };
    }

    case "BACK":
      return {
        ...state,
        step: Math.max(0, state.step - 1),
        errors: {},
      };

    case "GO_TO": {
      const targetStep = action.payload;

      if (targetStep <= state.maxVisited) {
        return {
          ...state,
          step: targetStep,
          errors: {},
        };
      }

      return state;
    }

    case "SUBMIT": {
      const errors = validateStep(
        2,
        state.values
      );

      if (Object.keys(errors).length > 0) {
        return {
          ...state,
          errors,
        };
      }

      return {
        ...state,
        submitted: true,
        errors: {},
      };
    }

    case "RESET":
      return initWizard(action.payload);

    default:
      throw new Error(
        `Unknown action: ${action.type}`
      );
  }
};