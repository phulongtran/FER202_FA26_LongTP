import { useReducer, useState } from "react";
import {
  COLORS,
  initialNotes,
  notesReducer,
} from "../Data/notesReducer";

import {
  createHistory,
  undoable,
} from "../Data/undoable";
import "./NotesBoard.css";

const notesWithHistory = undoable(notesReducer);

function NotesBoard() {
  const [history, dispatch] = useReducer(
    notesWithHistory,
    initialNotes,
    createHistory
  );

  const { past, present, future } = history;

  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const displayedNotes = [...present.items].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned)
  );

  const handleAddNote = () => {
    if (!text.trim()) {
      return;
    }

    dispatch({
      type: "ADD_NOTE",
      payload: {
        text,
        color: selectedColor,
      },
    });

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      dispatch({ type: "UNDO" });
    }

    if (e.ctrlKey && e.key.toLowerCase() === "y") {
      e.preventDefault();
      dispatch({ type: "REDO" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNote();
  };

  return (
    <div
      className="notes-page"
      onKeyDown={handleKeyDown}
    >
      <div className="notes-container">
        <div className="notes-header">
          <div>
            <span className="notes-label">
              USE REDUCER
            </span>

            <h1>Bảng ghi chú</h1>

            <p>
              Sticky Notes với Undo / Redo bằng Higher-Order Reducer
            </p>
          </div>

          <div className="history-info">
            <span>
              {present.items.length} ghi chú
            </span>
          </div>
        </div>

        <div className="notes-toolbar">
          <div className="note-input-section">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nhập nội dung ghi chú..."
              />

              <button
                type="submit"
                className="add-button"
              >
                + Thêm ghi chú
              </button>
            </form>

            <div className="color-picker">
              <span>Màu:</span>

              <div className="color-options">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-dot ${
                      selectedColor === color
                        ? "selected"
                        : ""
                    }`}
                    style={{
                      backgroundColor: color,
                    }}
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    aria-label={`Chọn màu ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="history-actions">
            <button
              type="button"
              className="history-button"
              disabled={past.length === 0}
              onClick={() =>
                dispatch({ type: "UNDO" })
              }
            >
              ↶ Hoàn tác ({past.length})
            </button>

            <button
              type="button"
              className="history-button"
              disabled={future.length === 0}
              onClick={() =>
                dispatch({ type: "REDO" })
              }
            >
              ↷ Làm lại ({future.length})
            </button>

            <button
              type="button"
              className="clear-button"
              disabled={present.items.length === 0}
              onClick={() =>
                dispatch({ type: "CLEAR_ALL" })
              }
            >
              Xóa hết
            </button>
          </div>
        </div>

        <div className="shortcut">
          <span>Phím tắt:</span>
          <kbd>Ctrl</kbd>
          <span>+</span>
          <kbd>Z</kbd>
          <span>Hoàn tác</span>

          <span className="shortcut-separator">•</span>

          <kbd>Ctrl</kbd>
          <span>+</span>
          <kbd>Y</kbd>
          <span>Làm lại</span>
        </div>

        {displayedNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>

            <h2>Chưa có ghi chú</h2>

            <p>
              Hãy thêm một ghi chú mới để bắt đầu.
            </p>
          </div>
        ) : (
          <div className="notes-grid">
            {displayedNotes.map((note) => (
              <div
                key={note.id}
                className={`note-card ${
                  note.pinned ? "pinned" : ""
                }`}
                style={{
                  backgroundColor: note.color,
                }}
              >
                <div className="note-top">
                  <span className="note-id">
                    #{note.id}
                  </span>

                  {note.pinned && (
                    <span className="pin-label">
                      📌
                    </span>
                  )}
                </div>

                <p className="note-text">
                  {note.text}
                </p>

                <div className="note-footer">
                  <div className="note-colors">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`mini-color ${
                          note.color === color
                            ? "active"
                            : ""
                        }`}
                        style={{
                          backgroundColor: color,
                        }}
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_COLOR",
                            payload: {
                              id: note.id,
                              color,
                            },
                          })
                        }
                        aria-label="Đổi màu ghi chú"
                      />
                    ))}
                  </div>

                  <div className="note-actions">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_PIN",
                          payload: note.id,
                        })
                      }
                    >
                      {note.pinned
                        ? "Bỏ ghim"
                        : "Ghim"}
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        dispatch({
                          type: "DELETE",
                          payload: note.id,
                        })
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="notes-footer">
          <span>
            Lịch sử tối đa 20 bước
          </span>

          <span>
            Đã hoàn tác: {past.length} · Có thể làm lại:{" "}
            {future.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotesBoard;