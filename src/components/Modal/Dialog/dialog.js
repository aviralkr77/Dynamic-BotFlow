import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './dialog.scss';
export default function Dialog({ show, onHide }) {
  console.log('Dialog component rendered with props:', show);
  

  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign-Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { email, password });
    } else {
      console.log('Sign-Up:', { name, email, password, confirmPassword });
    }
  };

  return (
    <>
      <Modal backdropClassName='bdCustom' dialogClassName='customDialog' show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button
              variant={isLogin ? 'primary' : 'secondary'}
              onClick={() => setIsLogin(true)}
            >
              LOGIN
            </Button>{' '}
            |{' '}
            <Button
              variant={!isLogin ? 'primary' : 'secondary'}
              onClick={() => setIsLogin(false)}
            >
              SIGN-UP
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {!isLogin && (
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Button
              variant="primary"
              type="submit"
              disabled={isLogin && (!email || !password)} // Disable login button if fields are empty
            >
              {isLogin ? 'Login' : 'Sign-Up'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}