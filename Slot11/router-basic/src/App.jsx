
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HelpLayout from "./layouts/HelpLayout";

import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import FAQPage from "./pages/FAQPage";
import RulesPage from "./pages/RulesPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="books" element={<BooksPage />} />

        <Route path="help" element={<HelpLayout />}>
          <Route index element={<Navigate to="faq" replace />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="rules" element={<RulesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
