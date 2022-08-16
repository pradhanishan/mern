import { FC } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

interface IFormInputProps {
  controlId: string;
  label: string;
  type: string;
  placeholder: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  elementValue: string;
}

const FormInput: FC<IFormInputProps> = (props) => {
  return (
    <>
      <FloatingLabel controlId={props.controlId} label={props.label} className="mb-3">
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.handleInputChange}
          value={props.elementValue}
        />
      </FloatingLabel>
    </>
  );
};

export default FormInput;
