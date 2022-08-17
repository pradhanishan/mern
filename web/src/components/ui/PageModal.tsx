import React, { FC } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface IPageModalProps {
  show: boolean;
  heading: string;
  body: string;
  redirectUrl: string;
  showHandler: (event: React.MouseEvent) => void;
}

const PageModal: FC<IPageModalProps> = (props) => {
  return (
    <Modal show={props.show} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>I will not close if you click outside me. Don't even try to press escape key.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.showHandler}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PageModal;
