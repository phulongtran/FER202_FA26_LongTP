export const COLORS = [
  "#fff3a3",
  "#c8f7c5",
  "#cfe8ff",
  "#ffd6e0",
];

export const initialNotes = {
  nextId: 3,
  items: [
    {
      id: 1,
      text: "Reducer phải là hàm thuần",
      color: COLORS[0],
      pinned: true,
    },
    {
      id: 2,
      text: "Không sửa trực tiếp state",
      color: COLORS[2],
      pinned: false,
    },
  ],
};

export function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE": {
      const text = action.payload.text.trim();

      if (!text) {
        return state;
      }

      const newNote = {
        id: state.nextId,
        text,
        color: action.payload.color,
        pinned: false,
      };

      return {
        ...state,
        nextId: state.nextId + 1,
        items: [newNote, ...state.items],
      };
    }

    case "CHANGE_COLOR": {
      const { id, color } = action.payload;

      const noteExists = state.items.some((note) => note.id === id);

      if (!noteExists) {
        return state;
      }

      return {
        ...state,
        items: state.items.map((note) =>
          note.id === id
            ? {
                ...note,
                color,
              }
            : note
        ),
      };
    }

    case "TOGGLE_PIN": {
      const noteExists = state.items.some(
        (note) => note.id === action.payload
      );

      if (!noteExists) {
        return state;
      }

      return {
        ...state,
        items: state.items.map((note) =>
          note.id === action.payload
            ? {
                ...note,
                pinned: !note.pinned,
              }
            : note
        ),
      };
    }

    case "DELETE": {
      const newItems = state.items.filter(
        (note) => note.id !== action.payload
      );

      if (newItems.length === state.items.length) {
        return state;
      }

      return {
        ...state,
        items: newItems,
      };
    }

    case "CLEAR_ALL": {
      if (state.items.length === 0) {
        return state;
      }

      return {
        ...state,
        items: [],
      };
    }

    default:
      return state;
  }
}