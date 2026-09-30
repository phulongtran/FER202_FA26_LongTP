import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

const faqs = [
  { id: 1, question: 'React là gì?', answer: 'Thư viện JavaScript để xây dựng giao diện người dùng theo component.' },
  { id: 2, question: 'State khác props thế nào?', answer: 'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.' },
  { id: 3, question: 'Vì sao phải dùng setState?', answer: 'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.' },
];

// Component con độc lập
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-2">
      <Card.Header
        role="button"
        className="d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{question}</span>
        <strong>{isOpen ? '−' : '+'}</strong>
      </Card.Header>
      {isOpen && <Card.Body>{answer}</Card.Body>}
    </Card>
  );
};

export default function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false);
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const handleModeChange = (e) => {
    setSingleMode(e.target.checked);
    setOpenId(null);
  };

  return (
    <Container className="my-4" style={{ maxWidth: '600px' }}>
      <h3 className="mb-3">Bài 1: FAQ Accordion</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Check
          type="switch"
          id="single-mode-switch"
          label="Chỉ mở một câu tại một thời điểm"
          checked={singleMode}
          onChange={handleModeChange}
        />
        <Button
          variant="outline-danger"
          size="sm"
          disabled={!singleMode || openId === null}
          onClick={() => setOpenId(null)}
        >
          Đóng tất cả
        </Button>
      </div>

      {singleMode
        ? faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <Card key={item.id} className="mb-2">
                <Card.Header
                  role="button"
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => handleToggle(item.id)}
                >
                  <span>{item.question}</span>
                  <strong>{isOpen ? '−' : '+'}</strong>
                </Card.Header>
                {isOpen && <Card.Body>{item.answer}</Card.Body>}
              </Card>
            );
          })
        : faqs.map((item) => <FaqItem key={item.id} {...item} />)}
    </Container>
  );
}