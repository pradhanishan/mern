import { FC } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "./header-navbar.module.css";
import HeaderNavLink from "./HeaderNavLink";
import routes from "../../../config/route-config";

const HeaderNavbar: FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className={classes["navbar"]}>
      <Container>
        <Navbar.Brand href="#home">Daily Quotes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <HeaderNavLink link={routes.home} content="Home" />
            <HeaderNavLink link={routes.dashboard} content="Dashboard" />
            <HeaderNavLink link={routes.about} content="About" />
            <HeaderNavLink link={routes.documentation} content="Documentation" />
            <HeaderNavLink link={routes.support} content="Support" />
          </Nav>
          <Nav>
            <HeaderNavLink link={routes.auth} content="Login" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
