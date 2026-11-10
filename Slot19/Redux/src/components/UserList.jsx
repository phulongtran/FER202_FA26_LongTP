
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  ListGroup,
  Spinner,
  Alert,
  Button,
} from 'react-bootstrap';

import {
  fetchUsers,
  fetchPostsByUser,
} from '../redux/users/userActions';

export default function UserList() {
  const {
    items,
    loading,
    error,
    selectedId,
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  // Tự động lấy Users khi component được render
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Hiển thị Loading
  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" />
        <p className="mt-2">Đang tải danh sách Users...</p>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <Alert variant="danger">
        {error}

        <Button
          size="sm"
          className="ms-2"
          onClick={() => dispatch(fetchUsers())}
        >
          Thử lại
        </Button>
      </Alert>
    );
  }

  return (
    <ListGroup>
      {items.map((user) => (
        <ListGroup.Item
          key={user.id}
          action
          active={user.id === selectedId}
          onClick={() => dispatch(fetchPostsByUser(user.id))}
        >
          <div className="fw-bold">
            {user.name}
          </div>

          <small>
            {user.email} · {user.company.name}
          </small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
