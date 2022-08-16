import React, { FC } from "react";
import { useState } from "react";
import classes from "./auth-page.module.css";
import AuthForm from "../components/auth/AuthForm";

const AuthPage: FC = () => {
  const [authMode, setAuthMode] = useState<{
    login: boolean;
    register: boolean;
  }>({
    login: true,
    register: false,
  });

  const enableLoginModeHandler = (event: React.MouseEvent<HTMLElement>): void => {
    setAuthMode({ login: true, register: false });
  };

  const enableRegisterModeHandler = (event: React.MouseEvent<HTMLElement>): void => {
    setAuthMode({ login: false, register: true });
  };

  return (
    <div className={classes["auth-page-container"]}>
      <AuthForm
        authMode={authMode}
        handleEnableLoginMode={enableLoginModeHandler}
        handleEnableRegisterMode={enableRegisterModeHandler}
      />
    </div>
  );
};

export default AuthPage;
