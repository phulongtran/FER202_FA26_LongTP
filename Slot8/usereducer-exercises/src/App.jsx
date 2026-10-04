import StepCounter from "./usereducer/StepCounter";
import OrderTracker from "./usereducer/OrderTracker";
import KanbanBoard from "./usereducer/KanbanBoard";
import CourseWizard from "./usereducer/CourseWizard";
import NotesBoard from "./usereducer/NotesBoard";
function App() {
  return (
    <>
      <StepCounter />
      <OrderTracker />
       <KanbanBoard />
       <CourseWizard />
       <NotesBoard />
    </>
  );
}

export default App;