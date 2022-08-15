import classes from "./app.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from "react";
import Header from "./components/layout/header/Header";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import DocumentationPage from "./pages/DocumentationPage";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import routes from "./config/route-config";

const App: FC = () => {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes["app-body"]}>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.dashboard} element={<DashboardPage />} />
          <Route path={routes.about} element={<AboutPage />} />
          <Route path={routes.support} element={<SupportPage />} />
          <Route path={routes.documentation} element={<DocumentationPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterPage />} />
          <Route path={routes.none} element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
