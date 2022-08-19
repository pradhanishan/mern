import React, { FC } from "react";
import Button from "react-bootstrap/button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../redux/slices/auth-slice";
import { modalActions } from "../../redux/slices/modal-slice";
import applicationConfig from "../../config/application-config";
import sendRequest from "../../utilities/api/sendRequest";
import TRequest from "../../types/TRequest";

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  //   logout
  const logoutHandler = async (event: React.MouseEvent): Promise<void> => {
    // send logout request
    const request: TRequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken") || "",
      },
      serverUrl: `${applicationConfig.serverUrl}/auth/logout`,
    };
    const responseData = await sendRequest(request);

    if (responseData.success) {
      localStorage.clear();
      dispatch(authActions.logout());
      dispatch(
        modalActions.open({
          isOpen: true,
          link: "/auth",
          title: "Success",
          content: "Logged out successfully!",
        })
      );
    }
  };

  return (
    <Button variant="danger" onClick={logoutHandler} style={{ width: "100%" }}>
      Logout
    </Button>
  );
};

export default Logout;
