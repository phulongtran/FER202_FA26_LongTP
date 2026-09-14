import './App.css'
import About from './About'

function App() {
  //khai báo 1 object user
  const user1 = {
    name: "TralTB",
    email: "traltb@fe.edu.vn"
  }

  const user2 = {
    name: "LongTP",
    email: "longtp@fe.edu.vn"
  }

  return (
    <>
      <About user={user1} />
      <About user={user2} />
    </>
  )
}

export default App