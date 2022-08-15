import { FC } from "react";
import classes from "./header.module.css";
import HeaderNavbar from "./HeaderNavbar";
import writingImg from "../../../assets/images/writing-img.jpg";

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <HeaderNavbar />
    </header>
  );
};

export default Header;
