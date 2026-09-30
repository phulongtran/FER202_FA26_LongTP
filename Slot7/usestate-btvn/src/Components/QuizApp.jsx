import React, { useState } from 'react';
import { Container, Card, Button, ProgressBar, Badge, ListGroup, Alert } from 'react-bootstrap';

// Dữ liệu câu hỏi ban đầu
const QUESTIONS = [
  { id: 'q1', text: 'Hook nào dùng để lưu trạng thái cục bộ?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], answer: 1 },
  { id: 'q2', text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?', options: ['1', '2', '3', '0'], answer: 0 },
  { id: 'q3', text: 'Cách đúng để thêm phần tử vào mảng state?', options: ['list.push(x)', 'setList(list.push(x))', 'setList([...list, x])', 'list[list.length] = x'], answer: 2 },
  { id: 'q4', text: 'Checkbox có điều khiển dùng prop nào?', options: ['value', 'checked', 'selected', 'defaultValue'], answer: 1 },
];

// Hàm xáo trộn mảng (Fisher-Yates) trên BẢN SAO để đảm bảo tính bất biến
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Component Quiz nội bộ: Quản lý logic 1 lượt làm bài
function Quiz({ attempt, onRestart }) {
  // 1. Lazy Initializer: Chỉ gọi hàm shuffle 1 lần duy nhất ở lần render đầu tiên
  const [questions] = useState(() => shuffle(QUESTIONS));

  // State vị trí câu hỏi, danh sách đáp án đã chọn dạng Object { qId: optionIndex }, và trạng thái nộp bài
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // 2. Dữ liệu dẫn xuất (Derived State)
  const current = questions[index];
  const selected = answers[current.id]; // Cần chú ý selected có thể bằng 0 (index 0)
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === questions.length;

  // Tính điểm số dựa trên so sánh object answers với đáp án đúng
  const score = questions.filter((q) => answers[q.id] === q.answer).length;

  // 3. Hàm chọn đáp án (dùng Computed Property Name)
  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: optionIndex,
    }));
  };

  // 4. Màn hình Kết Quả (Nộp bài thành công)
  if (finished) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center">
          <Card.Title className="fs-3 mb-3">Kết quả làm bài</Card.Title>
          <Alert variant="success" className="fs-4 fw-bold">
            Bạn đúng {score}/{questions.length} câu!
          </Alert>

          <ListGroup className="text-start mb-4">
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.answer;
              return (
                <ListGroup.Item key={q.id} className="py-3">
                  <div className="fw-semibold mb-2">
                    Câu {idx + 1}: {q.text}
                  </div>
                  <div>
                    Đáp án bạn chọn:{' '}
                    <Badge bg={isCorrect ? 'success' : 'danger'}>
                      {userAnswer !== undefined ? q.options[userAnswer] : 'Chưa chọn'}
                    </Badge>
                  </div>
                  {!isCorrect && (
                    <div className="text-success small mt-1">
                      Đáp án đúng: <strong>{q.options[q.answer]}</strong>
                    </div>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>

          <Button variant="primary" size="lg" onClick={onRestart}>
            Làm lại bài test
          </Button>
        </Card.Body>
      </Card>
    );
  }

  // 5. Màn hình Câu hỏi
  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center bg-light">
        <span className="fw-bold text-primary">Lượt làm bài thứ {attempt}</span>
        <span className="text-muted">
          Đã trả lời: {answeredCount}/{questions.length}
        </span>
      </Card.Header>

      <Card.Body>
        {/* Tiến độ bài làm */}
        <ProgressBar
          now={(answeredCount / questions.length) * 100}
          className="mb-4"
          style={{ height: '8px' }}
        />

        {/* Nội dung câu hỏi */}
        <h5 className="mb-3">
          Câu {index + 1}: {current.text}
        </h5>

        {/* Các lựa chọn */}
        <ListGroup className="mb-4">
          {current.options.map((opt, optIdx) => {
            const isSelected = selected === optIdx;
            return (
              <ListGroup.Item
                key={optIdx}
                action
                active={isSelected}
                onClick={() => handleSelectOption(optIdx)}
                className="py-3"
              >
                <strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}
              </ListGroup.Item>
            );
          })}
        </ListGroup>

        {/* Các nút điều hướng */}
        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="secondary"
            disabled={index === 0}
            onClick={() => setIndex((i) => i - 1)}
          >
            ← Trước
          </Button>

          {index < questions.length - 1 ? (
            <Button
              variant="primary"
              disabled={selected === undefined} // Kiểm tra undefined vì index 0 là hợp lệ
              onClick={() => setIndex((i) => i + 1)}
            >
              Tiếp →
            </Button>
          ) : (
            <Button
              variant="success"
              disabled={!isAllAnswered}
              onClick={() => setFinished(true)}
            >
              Nộp bài
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

// Component chính export ra ngoài
export default function QuizApp() {
  const [attempt, setAttempt] = useState(1);

  // RESET STATE BẰNG KEY:
  // Thay vì viết hàm reset từng state trong Quiz, khi đổi `key={attempt}`, React tự động gỡ
  // component Quiz cũ và khởi tạo component Quiz mới hoàn toàn từ đầu!
  return (
    <Container className="my-4" style={{ maxWidth: '650px' }}>
      <h3 className="text-center mb-4">Bài 5: Quiz Trắc Nghiệm</h3>
      <Quiz key={attempt} attempt={attempt} onRestart={() => setAttempt((a) => a + 1)} />
    </Container>
  );
}