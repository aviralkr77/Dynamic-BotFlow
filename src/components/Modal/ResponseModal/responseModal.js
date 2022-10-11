import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Dropdown,
  ListGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import {
  TiSortAlphabetically,
  TiSortNumerically,
  TiLocationOutline,
} from "react-icons/ti";

import { FaTelegramPlane } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import "./responseModal.scss";

function ResponseModal({
  onShowEdit,
  onCloseEdit,
  onSave,
  title,
  message,
  userResponseType,
  setFormData,
}) {
  const [button, setButton] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [input, setInput] = useState({
    key: "",
    msg: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const text = e.target.value;
    setFormData((formData) => ({ ...formData, [e.target.name]: text }));
  };

  const inputHandler = (e) => {
    e.preventDefault();
    const text = e.target.value;
    e.target.name == "keywordData"
      ? setInput({ key: text })
      : setInput({ msg: text });
  };

  const addButtonHandler = () => {
    const text = input.msg;
    if (text) {
      setButton((button) => [...button, { id: uuidv4(), text }]);
      
      setInput({ msg: " " });
    }
  };

  const addKeywordHandler = () => {
    const text = input.key;
    if (text) {
      setKeyword((keyword) => [...keyword, { id: uuidv4(), text }]);
      setInput({ key: " " });
    }
  };

  const dropdownHandler = (e) => {
    const text = e;
    if (text) {
      setFormData((formData) => ({ ...formData, userResponseType: text }));
    }
  };

 const onSubmit = () => {
  
    if(button){
      let btnArr = []
      button.forEach((btn)=>{
        btnArr.push(btn.text)
      })
      setFormData((formData) => ({ ...formData, buttonData: btnArr }));
    } 
    if(keyword){
      let keyArr = []
      keyword.forEach((key)=>{
        keyArr.push(key.text)
      })
      setFormData((formData) => ({ ...formData, keywordData: keyArr }));
    }

  }

  return (
    <>
      <Modal
        scrollable={true}
        className={"responseModal"}
        show={onShowEdit}
        onHide={onCloseEdit}
      >
        <Modal.Header>
          <Modal.Title>
            <FaTelegramPlane />
            &nbsp;&nbsp;BOT MESSAGE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Message Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: welcome message"
                name="title"
                onChange={(e) => onChangeHandler(e)}
                value={title}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Validation</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className="px-4" variant="outline-dark">
                  {userResponseType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      dropdownHandler("None");
                    }}
                  >
                    {" "}
                    None
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dropdownHandler("Alphabetic");
                    }}
                  >
                    <TiSortAlphabetically /> Alphabetic
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dropdownHandler("Numeric");
                    }}
                  >
                    <TiSortNumerically /> Numeric{" "}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dropdownHandler("Alphanumeric");
                    }}
                  >
                    <TiSortAlphabetically />
                    <TiSortNumerically /> Alphanumeric{" "}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dropdownHandler("Email");
                    }}
                  >
                    <HiOutlineMail /> Email
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dropdownHandler("Location");
                    }}
                  >
                    <TiLocationOutline /> Location
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {/* Keyword  */}
            <Form.Label>Add Keywords</Form.Label>
            <Form className="border mb-2 pb-2 rounded btnForm">
              <ListGroup style={{ marginBottom: ".6rem" }}>
                <TransitionGroup>
                  {keyword.map(({ id, text }) => (
                    <CSSTransition key={id} timeout={100} classNames="item">
                      <ListGroup.Item className="border-0 ">
                        <Button
                          className=" "
                          variant="secondary"
                          size="md "
                          onClick={() =>
                            setKeyword((keyword) =>
                              keyword.filter((key) => key.id !== id)
                            )
                          }
                        >
                          &times;
                        </Button>
                        <Button className="mx-3 " variant="danger" size="md ">
                          {" "}
                          " {text} "
                        </Button>
                      </ListGroup.Item>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ListGroup>
              <InputGroup className="mb-1">
                <FormControl
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  name="keywordData"
                  placeholder="Enter a keyword "
                  value={input.key}
                  onChange={(e) => inputHandler(e)}
                />
                <Button variant="outline-dark" onClick={addKeywordHandler}>
                  <FaPlusCircle /> Add Keyword
                </Button>
              </InputGroup>
            </Form>
            <Form.Group className="mb-3" controlId="ControlTextarea1">
              <Form.Label>Edit Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                autoFocus
                name="message"
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              >
                {message}
              </Form.Control>
            </Form.Group>
          </Form>
          <Form.Label>Button Message</Form.Label>
          <Form className="border  rounded btnForm">
            <ListGroup style={{ marginBottom: "1rem" }}>
              <TransitionGroup>
                {button.map(({ id, text }) => (
                  <CSSTransition key={id} timeout={100} classNames="item">
                    <ListGroup.Item className="border-0  ">
                      <Button
                        className=" "
                        variant="secondary"
                        size="md "
                        onClick={() =>
                          setButton((button) =>
                            button.filter((item) => item.id !== id)
                          )
                        }
                      >
                        &times;
                      </Button>
                      <Button className="mx-3 " variant="dark" size="md ">
                        {" "}
                        {text}
                      </Button>
                    </ListGroup.Item>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                name="buttonData"
                value={input.msg}
                onChange={(e) => inputHandler(e)}
                placeholder="Enter Button Text"
              />
              <Button variant="outline-dark" onClick={addButtonHandler}>
                <FaPlusCircle /> Add Button
              </Button>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onSave}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResponseModal;
