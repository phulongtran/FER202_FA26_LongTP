
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center text-success mb-4">
        DemoAxios
      </h1>

      <div className="mb-4">
        <PatchPost />
      </div>

      <div className="mb-4">
        <UpdatePost />
      </div>

      <div className="mb-4">
        <CreatePost />
      </div>
      <h1 className="text-center my-4">DemoAxios</h1>

      <DeletePost />
      <PostList />
    </div>
    
  );
}

export default App;
