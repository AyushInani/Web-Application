import React, { useRef, useState } from "react";
import { From, Button, Card, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SmIcons from "./SmIcons";
import { Divider } from "@mui/material";
import { logIn } from "../contexts/newAuth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigateTo("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setError("There is no user with this mail id");
          break;
        case "auth/wrong-password":
          setError("Wrong Password - Try Again");
          break;
      }
    }
    setLoading(false);
  }
  return (
    <div
      style={{
        minWidth: "400px",
        maxWidth: "600px",
      }}
    >
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group className="mb-2" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <Divider />
          <SmIcons />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont have an Account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
