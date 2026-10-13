
import { Alert, ListGroup } from "react-bootstrap";

function RulesPage() {
  return (
    <section className="page-section">
      <h2 className="section-title">Nội quy thư viện</h2>

      <Alert variant="info">
        Sinh viên vui lòng tuân thủ các quy định để giữ môi trường học tập
        yên tĩnh và văn minh.
      </Alert>

      <ListGroup numbered>
        <ListGroup.Item>
          Giữ trật tự, không gây ảnh hưởng đến người đọc khác.
        </ListGroup.Item>
        <ListGroup.Item>
          Bảo quản sách và tài liệu, không viết hoặc làm hư hỏng sách.
        </ListGroup.Item>
        <ListGroup.Item>
          Trả sách đúng hạn theo thông tin mượn sách.
        </ListGroup.Item>
        <ListGroup.Item>
          Giữ vệ sinh chung và không để rác tại khu vực đọc sách.
        </ListGroup.Item>
        <ListGroup.Item>
          Tuân thủ hướng dẫn của nhân viên thư viện.
        </ListGroup.Item>
      </ListGroup>
    </section>
  );
}

export default RulesPage;
