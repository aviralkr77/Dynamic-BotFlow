import React, { useState, useEffect} from "react";
import { Modal, Button, Form} from "react-bootstrap";
import "./inputModal.scss";
import { MdHome } from "react-icons/md";
function InputModal({
  onShowEdit,
  onCloseEdit,
  onSave,
  title,
  message,
  setFormData,
}) {




  const onChangeHandler = (e) => {
    e.preventDefault();
    const text = e.target.value;

    setFormData((formData) => ({ ...formData, [e.target.name]: text }));
  };

  return (
    <>
      <Modal className="inputModal" show={onShowEdit} onHide={onCloseEdit}>
        <Modal.Header>
          <Modal.Title><MdHome/>&nbsp;&nbsp;{"WELCOME MESSAGE"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Message Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: title"
                name="title"
                value={title}
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{"Edit Message"}</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={2}
                autoFocus
                onChange={(e) => onChangeHandler(e)}
                value={message}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={onSave}>
            Close
          </Button> */}
          <Button variant="secondary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InputModal;
