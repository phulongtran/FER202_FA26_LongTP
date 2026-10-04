export const COLUMNS = {
  todo: "Cần làm",
  doing: "Đang làm",
  done: "Hoàn thành",
};

export const PRIORITIES = {
  high: "Cao",
  low: "Thấp",
};

export const TASK_ACTIONS = {
  ADD_TASK: "ADD_TASK",
  MOVE_TASK: "MOVE_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_PRIORITY: "TOGGLE_PRIORITY",
  RESET_TASKS: "RESET_TASKS",
};

export const initialTaskState = {
  nextId: 4,

  tasks: [
    {
      id: 1,
      title: "Đọc lý thuyết useReducer",
      priority: "high",
      status: "done",
    },
    {
      id: 2,
      title: "Làm bài Kanban",
      priority: "high",
      status: "doing",
    },
    {
      id: 3,
      title: "Ôn lại spread operator",
      priority: "low",
      status: "todo",
    },
  ],
};

// Action creators

export const addTask = (title, priority) => ({
  type: TASK_ACTIONS.ADD_TASK,
  payload: {
    title,
    priority,
  },
});

export const moveTask = (id, status) => ({
  type: TASK_ACTIONS.MOVE_TASK,
  payload: {
    id,
    status,
  },
});

export const deleteTask = (id) => ({
  type: TASK_ACTIONS.DELETE_TASK,
  payload: {
    id,
  },
});

export const togglePriority = (id) => ({
  type: TASK_ACTIONS.TOGGLE_PRIORITY,
  payload: {
    id,
  },
});

export const resetTasks = () => ({
  type: TASK_ACTIONS.RESET_TASKS,
});

// Reducer

export const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK: {
      const newTask = {
        id: state.nextId,
        title: action.payload.title,
        priority: action.payload.priority,
        status: "todo",
      };

      return {
        ...state,
        nextId: state.nextId + 1,
        tasks: [...state.tasks, newTask],
      };
    }

    case TASK_ACTIONS.MOVE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                status: action.payload.status,
              }
            : task
        ),
      };
    }

    case TASK_ACTIONS.DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    }

    case TASK_ACTIONS.TOGGLE_PRIORITY: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                priority: task.priority === "high" ? "low" : "high",
              }
            : task
        ),
      };
    }

    case TASK_ACTIONS.RESET_TASKS:
      return {
        ...initialTaskState,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};