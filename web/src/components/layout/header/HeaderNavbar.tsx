import { FC, useState } from "react";

import classes from "./header-navbar.module.css";
import HeaderNavLink from "./HeaderNavLink";
import routes from "../../../config/route-config";
import Logout from "../../auth/LogoutButton";
import { useAppSelector } from "../../../hooks/useAppSelector";
import HeaderDrawer from "./HeaderDrawer";
import { MdMenu } from "react-icons/md";

const HeaderNavbar: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  // drawer state
  const [show, setShow] = useState<boolean>(false);

  // open drawer
  const openDrawerHandler = (event: React.MouseEvent): void => {
    setShow(true);
  };

  // close drawer
  const closeDrawerHandler = (): void => {
    setShow(false);
  };

  return (
    <>
      <HeaderDrawer show={show} handleCloseDrawer={closeDrawerHandler} />

      <nav className={classes["navbar"]}>
        {/* button to open navbar drawer on smaller devices */}
        <div className={`${classes["navbar-drawer-button"]} hide-on-larger-device`}>
          <MdMenu onClick={openDrawerHandler} size={32} />
        </div>
        <div className={classes["navbar-header"]}>
          <h4>Daily Quotes</h4>
        </div>
        <div className={`${classes["navbar-navs-container"]} hide-on-smaller-device`}>
          <HeaderNavLink link={routes.home} content="Home" />
          <HeaderNavLink link={routes.about} content="About" />
          <HeaderNavLink link={routes.dashboard} content="Dashboard" />
          <HeaderNavLink link={routes.documentation} content="Documentation" />
          <HeaderNavLink link={routes.support} content="Support" />
        </div>
        <div className={`${classes["navbar-auth-container"]} hide-on-smaller-device`}>
          {!auth.isLoggedIn && <HeaderNavLink link={routes.auth} content="login" />}
          {auth.isLoggedIn && <Logout />}
        </div>
      </nav>
    </>
  );
};

export default HeaderNavbar;
