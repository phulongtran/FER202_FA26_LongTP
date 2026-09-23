import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100">
        <h1 className="text-center mb-4">
          Register Form
        </h1>

        <RegisterForm />
      </div>
    </div>
  );
}

export default App;