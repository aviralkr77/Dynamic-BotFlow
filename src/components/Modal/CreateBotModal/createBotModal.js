import React,{useState } from "react";
import{Modal , Button , Form } from 'react-bootstrap'
import './createBotModal.scss'
import { useNavigate } from "react-router-dom";

function CreateBotModal({onShowMod, onCloseMod, data}) {
 
  
  const[header, setHeader] = useState('Create a new story')
  const[title, setTitle] = useState('Story Title')
  const[desc,setdesc] = useState('Story Description')
  const[titleInput, setTiltleInput] = useState('')

  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const text = e.target.value
    if (text) {
      setTiltleInput(text)
    }
  }

 const onClickHandler = () => {

  localStorage.setItem('Title', titleInput);
  navigate("/chatflow");

 }
  
 const handleEnter = (event) => {
  if (event.key.toLowerCase() === "enter") {
    const form = event.target.form;
    const index = [...form].indexOf(event.target);
    form.elements[index + 1].focus();
    event.preventDefault();
  }
};


  return (
    <>
      <Modal className="createBotModal" show={onShowMod} onHide={onCloseMod}>
        <Modal.Header>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder={title}
                autoFocus
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                onKeyDown={handleEnter}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                placeholder={desc}
                rows={2}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseMod}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickHandler}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

  
export default CreateBotModal