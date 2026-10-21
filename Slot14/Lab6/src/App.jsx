
import AxiosDemo from './AxiosDemo';
import PostList from './PostList';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
import PatchPost from './PatchPost';
import DeletePost from './DeletePost';
import RequestConfig from './RequestConfig';

function App() {
  return (
    <div>
      <h1 className="text-center text-success my-4">
        DemoAxios
      </h1>

      <AxiosDemo />
      <hr />

      <PostList />
      <hr />

      <CreatePost />
      <hr />

      <UpdatePost />
      <hr />

      <PatchPost />
      <hr />

      <DeletePost />
      <hr />

      <RequestConfig />
    </div>
  );
}

export default App;
