import { FC, useState } from "react";
import classes from "./header-drawer.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import HeaderNavLink from "./HeaderNavLink";
import routes from "../../../config/route-config";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { MdHome, MdInfo, MdDashboard, MdContactSupport, MdLogin } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import Logout from "../../auth/LogoutButton";
import { NavLink } from "react-router-dom";

interface IHeaderDrawerProps {
  show: boolean;
  handleCloseDrawer: () => void;
}

const HeaderDrawer: FC<IHeaderDrawerProps> = (props) => {
  const auth = useAppSelector((state) => state.auth);
  return (
    <>
      <Offcanvas
        show={props.show}
        onHide={props.handleCloseDrawer}
        style={{ backgroundColor: "#364f6b", color: "#f5f5f5" }}
        className="hide-on-larger-device"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Daily Quotes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={classes["drawer-body"]}>
            <HeaderNavLink
              link={routes.home}
              content="Home"
              clickHandler={props.handleCloseDrawer}
              icon={<MdHome size={26} />}
            />
            <HeaderNavLink
              link={routes.about}
              content="About"
              clickHandler={props.handleCloseDrawer}
              icon={<MdInfo size={26} />}
            />
            {auth.isLoggedIn && (
              <HeaderNavLink
                link={routes.dashboard}
                content="Dashboard"
                clickHandler={props.handleCloseDrawer}
                icon={<MdDashboard size={26} />}
              />
            )}
            <HeaderNavLink
              link={routes.documentation}
              content="Documentation"
              clickHandler={props.handleCloseDrawer}
              icon={<HiDocumentDuplicate size={26} />}
            />
            <HeaderNavLink
              link={routes.support}
              content="Support"
              clickHandler={props.handleCloseDrawer}
              icon={<MdContactSupport size={26} />}
            />
            {!auth.isLoggedIn && (
              <HeaderNavLink
                link={routes.auth}
                content="Login"
                clickHandler={props.handleCloseDrawer}
                icon={<MdLogin size={26} />}
              />
            )}
          </div>

          {auth.isLoggedIn && (
            <NavLink to="/auth" onClick={props.handleCloseDrawer}>
              <Logout />
            </NavLink>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default HeaderDrawer;
