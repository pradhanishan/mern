import React, { FC } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { modalActions } from "../../redux/slices/modal-slice";
import { Link } from "react-router-dom";

const PageModal: FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(modalActions.close());
  };

  return (
    <Modal show={modal.isOpen} onHide={closeModal} backdrop="static" keyboard={false} centered>
      <h3 className="m-3">{modal.title}</h3>
      <Modal.Body>{modal.content}</Modal.Body>
      <Modal.Footer>
        <Link to={modal.link} onClick={closeModal}>
          <Button variant="outline-secondary">close</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default PageModal;
