
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import AxiosDemo from './AxiosDemo.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import EditPostPage from './pages/EditPostPage.jsx';

import PostListCard from './components/http/PostListCard.jsx';
import CreatePostCard from './components/http/CreatePostCard.jsx';
import UpdatePostCard from './components/http/UpdatePostCard.jsx';
import PatchPostCard from './components/http/PatchPostCard.jsx';
import DeletePostCard from './components/http/DeletePostCard.jsx';
import RequestConfigCard from './components/http/RequestConfigCard.jsx';

function AxiosDemoPage() {
  return <AxiosDemo />;
}

function HttpRequestsPage() {
  return (
    <Container className="py-4">
      <h2 className="mb-3">HTTP Requests với axios</h2>

      <Row xs={1} lg={2} className="g-4">
        <Col><PostListCard /></Col>
        <Col><CreatePostCard /></Col>
        <Col><UpdatePostCard /></Col>
        <Col><PatchPostCard /></Col>
        <Col><DeletePostCard /></Col>
        <Col><RequestConfigCard /></Col>
      </Row>
    </Container>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AxiosDemoPage />} />
        <Route path="http" element={<HttpRequestsPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="posts/new" element={<CreatePostPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts/:id" element={<PostDetailPage />} />
        <Route path="posts/:id/edit" element={<EditPostPage />} />
      </Route>
    </Routes>
  );
}
