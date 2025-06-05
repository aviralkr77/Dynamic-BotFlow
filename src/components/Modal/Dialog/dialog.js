import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./dialog.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import Spinner from "react-bootstrap/Spinner";

export default function Dialog({ show, onHide }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign-Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function login(email, password) {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setUser(response.data.user)); // Pass user data to Redux
      console.log("User logged in:", response.data.user);
      onHide();
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data?.message);
    }
  }

  async function signup() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/signup", {
        name,
        email,
        password,
        password2: confirmPassword,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onHide();
      dispatch(setUser(response.data.user)); // Pass user data to Redux
      setLoading(false);

      return response.data;
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data?.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
      console.log("Login:", { email, password });
    } else {
      signup(name, email, password, confirmPassword);
    }
  };

  return (
    <>
      <Modal
        backdropClassName="bdCustom"
        dialogClassName="customDialog"
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Button
              variant={isLogin ? "primary" : "secondary"}
              onClick={() => setIsLogin(true)}
            >
              LOGIN
            </Button>{" "}
            |{" "}
            <Button
              variant={!isLogin ? "primary" : "secondary"}
              onClick={() => setIsLogin(false)}
            >
              SIGN-UP
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
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
                {isLogin ? "Login" : "Sign-Up"}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
