import Exercise1Counter from './components/Exercise1Counter'
import Exercise2ControlledInput from './components/Exercise2ControlledInput'
import Exercise3ToggleVisibility from './components/Exercise3ToggleVisibility'
import Exercise4TodoList from './components/Exercise4TodoList'
import Exercise5ColorSwitcher from './components/Exercise5ColorSwitcher'

function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-5 text-dark">
        React Hook - useState Exercises
      </h1>

      <Exercise1Counter />
      <Exercise2ControlledInput />
      <Exercise3ToggleVisibility />
      <Exercise4TodoList />
      <Exercise5ColorSwitcher />
    </div>
  )
}

export default App