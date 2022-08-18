import React, { FC } from "react";
import Button from "react-bootstrap/button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../redux/slices/auth-slice";
import { modalActions } from "../../redux/slices/modal-slice";
import applicationConfig from "../../config/application-config";

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  //   logout
  const logoutHandler = async (event: React.MouseEvent): Promise<void> => {
    // send logout request
    console.log(localStorage.getItem("accessToken"));
    const requestOptions = {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("accessToken")!,
      },
    };

    const response = await fetch(`${applicationConfig.serverUrl}/auth/logout`, requestOptions);
    const responseData = await response.json();

    if (!responseData.success) {
      // refresh token here
      // const refreshRequestOptions = {
      //   method: "POST",
      //   headers: {
      //     authorization: localStorage.getItem("refreshToken")!,
      //   },
      // };
      // const refreshResponse = await fetch(`${applicationConfig.serverUrl}/auth/refresh-token`, refreshRequestOptions);
      // const refreshResponseData = await refreshResponse.json();
      // if (!refreshResponseData.success) {
      //   dispatch(
      //     modalActions.open({
      //       isOpen: true,
      //       title: "Error",
      //       content: "You are unauthorized to perform this request",
      //       link: "/",
      //     })
      //   );
      //   return;
      // }
    }

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
