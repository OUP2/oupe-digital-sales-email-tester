import "bulma/css/bulma.min.css";
import { Navbar } from "./navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DocumentationPage from "./pages/DocumentationPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import packageJSON from "../package.json";
import { Footer } from "./navbar/Footer";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  document.title = t("homepage.title");

  return (
    <>
      <Router
        basename={
          process.env.NODE_ENV === "production" ? `${packageJSON.name}/` : "/"
        }
      >
        <Navbar />
        <Routes>
          <Route path={"/"} element={<HomePage />} exact />
          <Route path={"/docs"} element={<DocumentationPage />} exact />
          <Route path={"/about"} element={<AboutPage />} exact />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
