import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        Don't have an account? <Link to="/signup">Create account</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
