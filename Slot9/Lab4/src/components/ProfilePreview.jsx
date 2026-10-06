import { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';

const MAX_BIO = 150;

const majors = [
  'Công nghệ thông tin',
  'Kỹ thuật phần mềm',
  'Trí tuệ nhân tạo',
  'An toàn thông tin',
  'Kinh doanh quốc tế',
];

function ProfilePreview() {
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState(majors[0]);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  const handleNameKeyDown = (e) => {
    if (e.key === 'Escape') {
      setFullName('');
    }
  };

  const handleBioChange = (e) => {
    const value = e.target.value;
    setBio(value.slice(0, MAX_BIO));
  };

  const remaining = MAX_BIO - bio.length;

  return (
    <div className="py-4">
      <h1 className="mb-4">Hồ sơ cá nhân</h1>

      <Row className="g-4">
        {/* Form */}
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-4">
                Thông tin hồ sơ
              </Card.Title>

              <Form onSubmit={(e) => e.preventDefault()}>
                {/* Họ tên */}
                <Form.Group className="mb-3">
                  <Form.Label>Họ tên</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Nhập họ tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onKeyDown={handleNameKeyDown}
                    onFocus={() => setFocused('fullName')}
                    onBlur={() => setFocused('')}
                    className={
                      focused === 'fullName'
                        ? 'border-primary border-2'
                        : ''
                    }
                  />

                  <Form.Text className="text-muted">
                    Nhấn Esc để xóa tên.
                  </Form.Text>
                </Form.Group>

                {/* Chuyên ngành */}
                <Form.Group className="mb-3">
                  <Form.Label>Chuyên ngành</Form.Label>

                  <Form.Select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  >
                    {majors.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Giới thiệu */}
                <Form.Group className="mb-3">
                  <Form.Label>Giới thiệu</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Nhập một vài thông tin về bạn..."
                    value={bio}
                    onChange={handleBioChange}
                  />

                  <div
                    className={
                      remaining < 20
                        ? 'text-danger mt-1'
                        : 'text-muted mt-1'
                    }
                  >
                    Còn {remaining}/{MAX_BIO} ký tự
                  </div>
                </Form.Group>

                {/* Mật khẩu */}
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>

                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        setShowPassword((s) => !s)
                      }
                    >
                      {showPassword ? 'Ẩn' : 'Hiện'}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Lưu thông tin
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Preview */}
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-4">
                Xem trước
              </Card.Title>

              <div className="mb-3">
                <h3>
                  {fullName.trim() || 'Chưa nhập tên'}
                </h3>

                <p className="text-primary mb-2">
                  {major}
                </p>
              </div>

              <div className="mb-3">
                <strong>Giới thiệu</strong>

                {bio ? (
                  <p className="mt-2">{bio}</p>
                ) : (
                  <p className="text-muted fst-italic mt-2">
                    Chưa có giới thiệu
                  </p>
                )}
              </div>

              <div>
                <strong>Mật khẩu</strong>

                <p className="text-muted mt-2">
                  Đã nhập {password.length} ký tự
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProfilePreview;