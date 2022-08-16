import React, { FC } from "react";
import { useState } from "react";
import classes from "./auth-form.module.css";
import FormInput from "../ui/FormInput";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface IAuthFormProps {
  authMode: { login: boolean; register: boolean };
  handleEnableLoginMode: (event: React.MouseEvent<HTMLElement>) => void;
  handleEnableRegisterMode: (event: React.MouseEvent<HTMLElement>) => void;
}

const AuthForm: FC<IAuthFormProps> = (props) => {
  const [authForm, setAuthForm] = useState<{ username: string; email: string; identifier: string; password: string }>({
    username: "",
    email: "",
    identifier: "",
    password: "",
  });

  const identifierChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, identifier: userInputValue };
    });
  };

  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, username: userInputValue };
    });
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, email: userInputValue };
    });
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, password: userInputValue };
    });
  };

  return (
    <div className={classes["auth-form"]}>
      <Form>
        <h3 className="mb-3">{props.authMode.login ? "Login" : "Register"}</h3>

        {props.authMode.login && (
          <FormInput
            type="text"
            label="username or email"
            controlId="identifier-input"
            placeholder="username or email"
            handleInputChange={identifierChangeHandler}
            elementValue={authForm.identifier}
          />
        )}
        {props.authMode.register && (
          <FormInput
            type="text"
            label="username"
            controlId="username-input"
            placeholder="username"
            handleInputChange={usernameChangeHandler}
            elementValue={authForm.username}
          />
        )}
        {props.authMode.register && (
          <FormInput
            type="email"
            label="email"
            controlId="email-input"
            placeholder="username"
            handleInputChange={emailChangeHandler}
            elementValue={authForm.email}
          />
        )}
        <FormInput
          type="password"
          label="password"
          controlId="password-input"
          placeholder="password"
          handleInputChange={passwordChangeHandler}
          elementValue={authForm.password}
        />
        <Form.Text className="mb-3">Your credentials will not be shared with anybody</Form.Text>
        <div className={`${classes["button-group"]} mt-3`}>
          <Button className={`${classes["button-group-button"]} ${classes["button-success"]}`}>
            {props.authMode.login ? "login" : "register"}
          </Button>
          <Button className={`${classes["button-group-button"]} ${classes["button-danger"]}`} variant="danger">
            clear
          </Button>
        </div>

        <Button
          className={classes["out-group-button"]}
          variant="outline-secondary"
          onClick={props.authMode.login ? props.handleEnableRegisterMode : props.handleEnableLoginMode}
        >
          {props.authMode.login ? "I don't have an account" : "Go to login"}
        </Button>
      </Form>
    </div>
  );
};

export default AuthForm;
