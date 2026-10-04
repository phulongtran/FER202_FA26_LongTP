import StepCounter from "./usereducer/StepCounter";
import OrderTracker from "./usereducer/OrderTracker";
import KanbanBoard from "./usereducer/KanbanBoard";
import CourseWizard from "./usereducer/CourseWizard";
function App() {
  return (
    <>
      <StepCounter />
      <OrderTracker />
       <KanbanBoard />
       <CourseWizard />
    </>
  );
}

export default App;