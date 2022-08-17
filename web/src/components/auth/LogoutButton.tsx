import React, { FC } from "react";
import Button from "react-bootstrap/button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../redux/slices/auth-slice";
import { modalActions } from "../../redux/slices/modal-slice";
import { useAppSelector } from "../../hooks/useAppSelector";

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  //   logout
  const logoutHandler = async (event: React.MouseEvent): Promise<void> => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

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
