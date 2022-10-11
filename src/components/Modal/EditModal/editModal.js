import React, { useState, useEffect, useLayoutEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./editModal.scss";
import {
  FaUserEdit,
  FaTelegramPlane,
  FaAd,
  FaWrench,
} from "react-icons/fa";
import { MdHome } from "react-icons/md";
import InputModal from "../InputModal/inputModal";
import ResponseModal from "../ResponseModal/responseModal";


function EditModal({ onShow, onClose  }) {
  //Popup
  const onDragStart = (event, nodeType,data) => {
    event.dataTransfer.setData('application/reactflow', nodeType,data);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [show, setShow] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [modalType, setModalType] = useState("default");

  const onShowEdit = (modType) => {
    setShow(true);
  };
  const onShowRes = (modType) => {
    setShowRes(true);
  };
  const onCloseEdit = () => setShow(false);
  const onCloseRes = () => setShowRes(false);

  return (
    <>
      <InputModal
        onShowEdit={show}
        onCloseEdit={onCloseEdit}
        type={modalType}
      />
      <ResponseModal
        onShowEdit={showRes}
        onCloseEdit={onCloseRes}
        type={modalType}
      />
      
      <Modal className="editModal" show={onShow} onHide={onClose}>
        <Modal.Header className="headerOne" >
         <h3>INTERACTIONS</h3> 
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Button variant="outline-primary"  onDragStart={(event) => onDragStart(event, 'staticNode')} draggable>
                <MdHome />
              </Button>
              Start
            </Col>
            <Col>
              <Button variant="outline-primary"  onDragStart={(event) => onDragStart(event, 'resNode')} draggable>
                <FaTelegramPlane />
              </Button>
              Bot Message
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="outline-primary"  onDragStart={(event) => onDragStart(event, 'fbNode')} draggable>
                <FaWrench />
              </Button>
              Fallback
            </Col>
          </Row>
        
        </Modal.Body>
        <Modal.Header  className="headerTwo">
          <h3>ACTIONS</h3>
        </Modal.Header>
        <Modal.Body>
          
          <Row>
            <Col>
              <Button variant="outline-secondary"  onDragStart={(event) => onDragStart(event, 'quesNode')} draggable>
                <FaUserEdit />
              </Button>
              Question
            </Col>
            {/* <Col>
              <Button variant="outline-secondary">
                <FaUserEdit />
              </Button>
              Close Chat
            </Col> */}
          </Row>
          <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
         
        </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;
