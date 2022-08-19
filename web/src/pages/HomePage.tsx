import { FC, useEffect } from "react";
import classes from "./home-page.module.css";
import Card from "../components/ui/Card";
import Add from "../components/ui/Add";
import { useAppSelector } from "../hooks/useAppSelector";
import sendRequest from "../utilities/api/sendRequest";
import applicationConfig from "../config/application-config";

const HomePage: FC = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      {auth.isLoggedIn && (
        <div className={classes["logged-in-data"]}>
          <Add />
          <Card />
        </div>
      )}
      <div></div>
    </>
  );
};

export default HomePage;
