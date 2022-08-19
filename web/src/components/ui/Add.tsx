import React, { FC, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./add.module.css";
import sendRequest from "../../utilities/api/sendRequest";
import applicationConfig from "../../config/application-config";
import TRequest from "../../types/TRequest";
import { modalActions } from "../../redux/slices/modal-slice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import validateQuote from "../../utilities/validation/validateQuote";

const Add: FC = () => {
  const dispatch = useAppDispatch();

  //   state to check if there are errors in quote
  const [quoteStatus, setQuoteStatus] = useState<{ isValid: boolean; errors: { msg: string }[] }>({
    isValid: true,
    errors: [],
  });

  const [quote, setQuote] = useState<{ quote: string; anonymous: boolean }>({
    quote: "",
    anonymous: false,
  });

  //   handle input change on quote text area
  const quoteChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newInput: string = event.target.value;
    setQuote((previous) => {
      return {
        ...previous,
        quote: newInput,
      };
    });
  };

  const anonymousToggleHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuote((previous) => {
      return {
        ...previous,
        anonymous: !quote.anonymous,
      };
    });
  };

  const submitQuoteHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    // validate
    const quoteValidationStatus = validateQuote(quote.quote, quote.anonymous);
    if (!quoteValidationStatus.validated) {
      setQuoteStatus({
        isValid: false,
        errors: quoteValidationStatus.errors,
      });
      return;
    }
    const quoteData: {
      quote: string;
      anonymous: boolean;
    } = quote;

    const request: TRequest = {
      serverUrl: `${applicationConfig.serverUrl}/quotes`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken")!,
      },
      body: {
        ...quoteData,
      },
    };

    const responseData = await sendRequest(request);

    console.log(responseData);

    if (!responseData.success) {
      setQuoteStatus({
        isValid: false,
        errors: responseData.errors!,
      });
      return;
    }
    dispatch(
      modalActions.open({
        isOpen: true,
        title: "Success",
        content: "Your quote has been added successfully",
        link: "/",
      })
    );
  };

  //   reset errors
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuoteStatus({
        isValid: true,
        errors: [],
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, [quoteStatus.isValid]);

  return (
    <div className={classes["add-container"]}>
      <Form onSubmit={submitQuoteHandler}>
        <Form.Group className="mb-3" controlId="add-new-quote">
          <Form.Label className={classes["add-label"]}>Add a new quote</Form.Label>
          <Form.Control as="textarea" rows={5} onChange={quoteChangeHandler} value={quote.quote} />
        </Form.Group>
        {!quoteStatus.isValid && (
          <div className="text-danger">
            <ul>
              {quoteStatus.errors.map((error) => {
                return <li key={error.msg}>{error.msg}</li>;
              })}
            </ul>
          </div>
        )}
        <div className={classes["add-buttons-container"]}>
          <Button className="px-5" variant="success" type="submit">
            Add
          </Button>
          <Form.Check
            type="checkbox"
            id="post as anonymous"
            label="post anonymously"
            className={classes["add-check"]}
            onChange={anonymousToggleHandler}
          />
        </div>
      </Form>
      <hr />
    </div>
  );
};

export default Add;
