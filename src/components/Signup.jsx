import React, { useRef, useState, useEffect } from "react";
import { From, Button, Card, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Route, Navigate } from "react-router-dom";
import Profiles from "./Profiles";
import { signUp } from "../contexts/newAuth";
import SmIcons from "./SmIcons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const [user, authLoading, authError] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigateTo("/");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(emailRef.current.value);
    // console.log(passwordConfirmRef.current.value);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigateTo("/profileCreation");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setError(err.message);
          break;
        case "auth/weak-password":
          setError("Have a password of at least 6 characters");
          break;
      }
    }

    setLoading(false);
  }

  // function signupUtil() {
  //   handleSubmit();
  //   <Profiles />;
  // }
  return (
    <>
      <Card 
        style={{
          minWidth: "400px",
          maxWidth: "600px",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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

            <Form.Group className="mb-2" id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <SmIcons />
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
