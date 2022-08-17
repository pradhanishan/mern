import { FC } from "react";
import classes from "./about-page.module.css";
import { useAppDispatch } from "../hooks/useAppDispatch";

const AboutPage: FC = () => {
  const dispatch = useAppDispatch();

  return <div className={classes["about-page-container"]}></div>;
};

export default AboutPage;
