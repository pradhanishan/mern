import React, { FC } from "react";
import classes from "./header-navlink.module.css";
import { NavLink } from "react-router-dom";

interface THeaderNavLinkProps {
  link: string;
  content: string;
  icon?: JSX.Element;
  clickHandler?: (event: React.MouseEvent) => void;
}

const HeaderNavLink: FC<THeaderNavLinkProps> = (props) => {
  return (
    <>
      <NavLink
        to={props.link}
        className={({ isActive }) =>
          isActive
            ? `${classes["active-link"]} hide-on-smaller-device`
            : `${classes["inactive-link"]} hide-on-smaller-device`
        }
      >
        {props.content}
      </NavLink>
      <NavLink
        to={props.link}
        className={({ isActive }) =>
          isActive
            ? `${classes["active-link"]} hide-on-larger-device`
            : `${classes["inactive-link"]} hide-on-larger-device`
        }
        onClick={props.clickHandler}
      >
        <div className={classes["drawer-item"]}>
          {props.content} {props.icon}
        </div>
        <hr />
      </NavLink>
    </>
  );
};

export default HeaderNavLink;
