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
import { HiOutlineMail } from "react-icons/hi";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import "./questionModal.scss";

function QuestionModal({
  onShowEdit,
  onCloseEdit,
  data,
  buttonData,
  questionData,
  responseData,
  validRes,
  invalidRes,
  setFormData,
}) {
  const [button, setButton] = useState([]);
  const [keyword, setKeyword] = useState([]);
//   const [header, setHeader] = useState("Bot Response");
//   const [title, setTitle] = useState("Response Title");
//   const [label, setLabel] = useState("Edit Response");
//   const [style, setStyle] = useState("QuestionModal");
  const [pHolder, setPHolder] = useState("ex: Welcome Message");

//   const titleData = data;
  useEffect(() => {
    // if (type === "question") {
    //   setHeader("Question");
    //   setTitle("Question Title");
    //   setLabel("Edit Question");
    //   setStyle("questionModal");
    //   setPHolder("ex: Question Title");
    // }
  }, []);

  const onChangeHandler = (e) => {
    const text = e.target.value;
    if (text) {
      setFormData((formData) => ({ ...formData, [e.target.name]: text }));
    }
  };

  const addButtonHandler = () => {
    const text = buttonData;
    if (text) {
      setButton((button) => [...button, { id: uuidv4(), text }]);
    }
    setFormData((formData) => ({  buttonData: " " }));
  };
  // const addKeywordHandler = () => {
  //   const text = keywordData;
  //   console.log(text);
  //   if (text) {
  //     setKeyword((keyword) => [...keyword, { id: uuidv4(), text }]);
  //   }
  //   setFormData((formData) => ({  keywordData: "" }));
  // };

//   const dropdownHandler = (e) => {
//     const text = e;
//     if (text) {
//       setFormData((formData) => ({ ...formData, dropdownData: text }));
//     }
//   };

  return (
    <>
      <Modal
        scrollable={true}
        className="questionModal"
        show={onShowEdit}
        onHide={onCloseEdit}
      >
        <Modal.Header>
          <Modal.Title>Question Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder={pHolder}
                value={data}
                disabled={true}
              ></Form.Control>
            </Form.Group>

            {/* Validation */}

            {/* <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Validation</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className="px-4" variant="outline-dark">
                  {dropdownData}
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
            </Form.Group> */}
            {/* Keyword  */}
            {/* <Form.Label>Add Keywords</Form.Label>
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
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  placeholder="Enter a keyword "
                  value={keywordData}
                />
                <Button variant="outline-dark" onClick={addKeywordHandler}>
                  <FaPlusCircle /> Add Keyword
                </Button>
              </InputGroup>
            </Form> */}
            <Form.Label>Button Response</Form.Label>
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
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                placeholder="Enter Button Text"
                value={buttonData}
              />
              <Button variant="outline-dark" onClick={addButtonHandler}>
                <FaPlusCircle /> Add Button
              </Button>
            </InputGroup>
          </Form>
            <Form.Group className="mb-3" controlId="ControlTextarea1">
              <Form.Label className="mt-2">Edit question</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                autoFocus
                name="responseData"
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                
              >
                {questionData}
              </Form.Control>
              <Form.Label className="mt-2" >Invalid Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                autoFocus
                name="responseData"
                onChange={(e) => {
                  onChangeHandler(e);
                }}
               
              >
                {invalidRes}
              </Form.Control>
              <Form.Label className="mt-2" >Valid Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                autoFocus
                name="responseData"
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              >
                {validRes}
              </Form.Control>
            </Form.Group>
            
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={onCloseEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QuestionModal;
