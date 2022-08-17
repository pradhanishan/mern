import React, { FC } from "react";
import Button from "react-bootstrap/button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../redux/slices/auth-slice";
import { modalActions } from "../../redux/slices/modal-slice";

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  //   logout
  const logoutHandler = (event: React.MouseEvent): void => {
    localStorage.removeItem("isLoggedIn");
    dispatch(authActions.logout());
    dispatch(modalActions.open({ isOpen: true, title: "Success", content: "Logged out successfully", link: "/" }));
  };

  return (
    <Button variant="danger" onClick={logoutHandler} style={{ width: "100%" }}>
      Logout
    </Button>
  );
};

export default Logout;
