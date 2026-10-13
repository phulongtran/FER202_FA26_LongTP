
import { Accordion } from "react-bootstrap";

function FAQPage() {
  return (
    <section className="page-section">
      <h2 className="section-title">Câu hỏi thường gặp</h2>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Sinh viên có thể mượn sách ở đâu?
          </Accordion.Header>
          <Accordion.Body>
            Sinh viên đến thư viện trường, chọn sách và thực hiện thủ tục
            mượn theo hướng dẫn của nhân viên thư viện.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Làm thế nào để trả sách?
          </Accordion.Header>
          <Accordion.Body>
            Sinh viên mang sách đến quầy thư viện và hoàn tất thủ tục trả
            trước hoặc vào ngày hết hạn mượn.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Có thể gia hạn thời gian mượn sách không?
          </Accordion.Header>
          <Accordion.Body>
            Việc gia hạn phụ thuộc vào quy định của thư viện và tình trạng
            mượn của từng cuốn sách. Hãy liên hệ nhân viên để được hỗ trợ.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
}

export default FAQPage;
