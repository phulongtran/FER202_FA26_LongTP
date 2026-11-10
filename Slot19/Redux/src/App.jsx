
import { useState } from 'react';
import { Container, Nav, Row, Col } from 'react-bootstrap';

import Counter from './components/Counter';

import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartBadge from './components/CartBadge';

import Toolbar from './components/Toolbar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

import UserList from './components/UserList';
import UserPosts from './components/UserPosts';

export default function App() {
  const [activeTab, setActiveTab] = useState('todo');

  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);

  const openAdd = () => {
    setEditing(null);
    setShow(true);
  };

  const openEdit = (student) => {
    setEditing(student);
    setShow(true);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        Redux Practice Project
      </h2>

      <Nav
        variant="pills"
        className="justify-content-center mb-4 flex-wrap"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
      >
        <Nav.Item>
          <Nav.Link eventKey="counter">
            Bài 1 - Counter
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="todo">
            Bài 2 - Todo
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="users">
            Bài 3 - Users
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="cart">
            Bài 4 - Shopping Cart
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="students">
            Bài 5 - Students
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'counter' && (
        <div>
          <h4 className="mb-3">Redux Counter</h4>
          <Counter />
        </div>
      )}

      {activeTab === 'todo' && (
        <div>
          <h4 className="mb-3">Todo List - Redux</h4>
          <TodoForm />
          <FilterBar />
          <TodoList />
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h4 className="mb-3">Users & Posts - Redux Thunk + Axios</h4>

          <Row>
            <Col md={5} className="mb-3">
              <h5 className="mb-3">Danh sách Users</h5>
              <UserList />
            </Col>

            <Col md={7}>
              <h5 className="mb-3">Danh sách Posts</h5>
              <UserPosts />
            </Col>
          </Row>
        </div>
      )}

      {activeTab === 'cart' && (
        <div>
          <h4 className="mb-3">Shopping Cart</h4>
          <CartBadge />
          <ProductList />
          <Cart />
        </div>
      )}

      {activeTab === 'students' && (
        <div>
          <h4 className="mb-3">Quản lý Sinh viên</h4>

          <Toolbar onAdd={openAdd} />
          <StudentTable onEdit={openEdit} />

          <StudentFormModal
            show={show}
            onHide={() => setShow(false)}
            editing={editing}
          />
        </div>
      )}
    </Container>
  );
}
