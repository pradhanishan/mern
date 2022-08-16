import React, { FC } from "react";
import { useState, useEffect } from "react";
import classes from "./auth-form.module.css";
import FormInput from "../ui/FormInput";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import validateLoginFormInput from "../../utilities/validateLoginFormInput";
import validateRegistrationFormInput from "../../utilities/validateRegistrationFormInput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../redux/slices/auth-slice";

interface IAuthFormProps {
  authMode: { login: boolean; register: boolean };
  handleEnableLoginMode: (event: React.MouseEvent<HTMLElement>) => void;
  handleEnableRegisterMode: (event: React.MouseEvent<HTMLElement>) => void;
}

const AuthForm: FC<IAuthFormProps> = (props) => {
  const dispatch = useAppDispatch();
  // state to check form input validity
  const [formValidity, setFormValidity] = useState<{ isValid: boolean; errors: { msg: string }[] }>({
    isValid: true,
    errors: [],
  });
  // form input state
  const [authForm, setAuthForm] = useState<{ username: string; email: string; identifier: string; password: string }>({
    username: "",
    email: "",
    identifier: "",
    password: "",
  });

  // handle changes in the identifier field
  const identifierChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, identifier: userInputValue };
    });
  };

  // handle changes in the username field
  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, username: userInputValue };
    });
  };

  // handle changes in the email field
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, email: userInputValue };
    });
  };

  // handle changes in the password field
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const userInputValue: string = event.target.value;
    setAuthForm((previousState) => {
      return { ...previousState, password: userInputValue };
    });
  };

  // reset form inputs
  const resetFormHandler = () => {
    setAuthForm({
      email: "",
      password: "",
      identifier: "",
      username: "",
    });
  };

  // handle form submit
  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // register
    if (props.authMode.register) {
      const registrationData: {
        username: string;
        email: string;
        password: string;
      } = {
        username: authForm.username,
        email: authForm.email,
        password: authForm.password,
      };
      const validationResponse: { validated: boolean; errors: { msg: string }[] } =
        validateRegistrationFormInput(registrationData);
      if (!validationResponse.validated) {
        setFormValidity({
          isValid: validationResponse.validated,
          errors: validationResponse.errors,
        });
      }
      // front end validation passed -> send Register request here
    }
    // login
    if (props.authMode.login) {
      const loginData: { identifier: string; password: string } = {
        identifier: authForm.identifier,
        password: authForm.password,
      };
      const validationResponse: { validated: boolean; errors: { msg: string }[] } = validateLoginFormInput(loginData);
      if (!validationResponse.validated) {
        setFormValidity({
          isValid: validationResponse.validated,
          errors: validationResponse.errors,
        });
      }
    }

    // front end validation passed -> send Login request here
    localStorage.setItem("isLoggedIn", "true");
    dispatch(authActions.login());
  };

  // remove form errors after a 4 seconds...
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormValidity({
        isValid: true,
        errors: [],
      });
    }, 4000);
    resetFormHandler();
    return () => clearTimeout(timer);
  }, [formValidity.isValid]);

  // form errors

  return (
    <div className={classes["auth-form"]}>
      <Form onSubmit={formSubmitHandler}>
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
        {/* form errors */}
        {!formValidity.isValid ? (
          <div className="text-danger">
            <ul>
              {formValidity.errors.map((error) => {
                return <li key={error.msg}>{error.msg}</li>;
              })}
            </ul>
          </div>
        ) : null}
        <br />
        <Form.Text className="mb-3">Your credentials will not be shared with anybody</Form.Text>
        <div className={`${classes["button-group"]} mt-3`}>
          <Button className={`${classes["button-group-button"]} ${classes["button-success"]}`} type="submit">
            {props.authMode.login ? "login" : "register"}
          </Button>
          <Button
            className={`${classes["button-group-button"]} ${classes["button-danger"]}`}
            variant="danger"
            onClick={resetFormHandler}
          >
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
