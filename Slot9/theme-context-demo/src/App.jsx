import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

export default function App() {
  // App KHÔNG cần biết gì về theme
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}