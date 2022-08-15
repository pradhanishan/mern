import classes from "./app.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from "react";
import Header from "./components/layout/header/Header";
import DocumentationPage from "./pages/DocumentationPage";

const App: FC = () => {
  return (
    <div className={classes.app}>
      <Header />
      <main className={classes["app-body"]}>
        <DocumentationPage />
      </main>
    </div>
  );
};

export default App;
