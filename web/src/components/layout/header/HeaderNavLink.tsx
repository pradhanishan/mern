import { FC } from "react";
import classes from "./header-navlink.module.css";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

interface THeaderNavLinkProps {
  link: string;
  content: string;
}

const HeaderNavLink: FC<THeaderNavLinkProps> = (props) => {
  return (
    <NavLink
      to={props.link}
      className={({ isActive }) => (isActive ? classes["active-link"] : classes["inactive-link"])}
    >
      {props.content}
    </NavLink>
  );
};

export default HeaderNavLink;
