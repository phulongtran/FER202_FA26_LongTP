import React, { useState } from 'react';
import { Container, Card, Form, InputGroup, Alert, ButtonGroup, Button } from 'react-bootstrap';

// Hàm phân loại BMI theo chuẩn Châu Á (nằm ngoài component để tránh khởi tạo lại mỗi lần render)
const classify = (bmi) => {
  if (bmi < 18.5) return { label: 'Thiếu cân', variant: 'info' };
  if (bmi < 23) return { label: 'Bình thường', variant: 'success' };
  if (bmi < 25) return { label: 'Thừa cân', variant: 'warning' };
  return { label: 'Béo phì', variant: 'danger' };
};

export default function BmiCalculator() {
  // Chỉ dùng ĐÚNG 3 state như yêu cầu (lưu dạng chuỗi để người dùng gõ trống/dở dang không bị văng NaN)
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm'); // 'cm' hoặc 'm'

  // 1. Chuyển đổi sang kiểu số để tính toán
  const hNum = Number(height);
  const wNum = Number(weight);

  // Quy đổi chiều cao ra mét
  const heightInMeters = unit === 'cm' ? hNum / 100 : hNum;

  // 2. Validate dữ liệu đầu vào (Validation)
  const errors = {};
  if (height !== '') {
    const minH = unit === 'cm' ? 50 : 0.5;
    const maxH = unit === 'cm' ? 250 : 2.5;
    if (!(hNum >= minH && hNum <= maxH)) {
      errors.height = `Chiều cao phải từ ${minH} đến ${maxH} ${unit}`;
    }
  }

  if (weight !== '') {
    if (!(wNum >= 10 && wNum <= 300)) {
      errors.weight = 'Cân nặng phải từ 10 đến 300 kg';
    }
  }

  // 3. Tính toán dữ liệu dẫn xuất (Derived state) - KHÔNG TẠO STATE RIÊNG CHO BMI
  const isReady =
    height !== '' &&
    weight !== '' &&
    !errors.height &&
    !errors.weight &&
    heightInMeters > 0;

  const bmi = isReady ? (wNum / (heightInMeters * heightInMeters)).toFixed(1) : null;
  const result = bmi ? classify(Number(bmi)) : null;

  // 4. Xử lý chuyển đổi đơn vị chiều cao
  const handleUnitChange = (nextUnit) => {
    if (nextUnit === unit) return;

    if (height !== '' && !isNaN(hNum)) {
      if (nextUnit === 'm') {
        // cm -> m
        setHeight((Number(height) / 100).toString());
      } else {
        // m -> cm
        setHeight((Number(height) * 100).toString());
      }
    }
    setUnit(nextUnit);
  };

  return (
    <Container className="my-4" style={{ maxWidth: '500px' }}>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Bài 3: Máy tính BMI</Card.Title>

          {/* Ô nhập Chiều cao */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Chiều cao:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                placeholder={`Nhập chiều cao (${unit})`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                isInvalid={!!errors.height}
              />
              <ButtonGroup>
                <Button
                  variant={unit === 'cm' ? 'primary' : 'outline-secondary'}
                  onClick={() => handleUnitChange('cm')}
                >
                  cm
                </Button>
                <Button
                  variant={unit === 'm' ? 'primary' : 'outline-secondary'}
                  onClick={() => handleUnitChange('m')}
                >
                  m
                </Button>
              </ButtonGroup>
              <Form.Control.Feedback type="invalid">
                {errors.height}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Ô nhập Cân nặng */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Cân nặng (kg):</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                placeholder="Nhập cân nặng (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                isInvalid={!!errors.weight}
              />
              <InputGroup.Text>kg</InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {errors.weight}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Kết quả hiển thị */}
          {result ? (
            <Alert variant={result.variant} className="text-center mb-0 fw-bold">
              BMI = {bmi} → {result.label}
            </Alert>
          ) : (
            <Alert variant="secondary" className="text-center mb-0 text-muted">
              Vui lòng nhập đầy đủ và chính xác chiều cao, cân nặng.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}