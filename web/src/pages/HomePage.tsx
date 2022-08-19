import { FC } from "react";
import classes from "./home-page.module.css";
import Card from "../components/ui/Card";
import Add from "../components/ui/Add";
import { useAppSelector } from "../hooks/useAppSelector";

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
