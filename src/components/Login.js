import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, googleLogin, facebookLogin, currentUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Login, email or password doesn't exist");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const result = await googleLogin();
      const user = await result.user;
      console.log(result);
      console.log(user);
      console.log(currentUser);
      history.push("/");
    } catch {
      setError("Failed to Login, email or password doesn't exist");
    }
    setLoading(false);
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const result = await facebookLogin();
      const user = await result.user;
      console.log(result);
      console.log(user);
      console.log(currentUser);
      //history.push("/");
    } catch {
      setError("Failed to Login, email or password doesn't exist");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Log In
            </Button>
            <Button variant="success" disabled={loading} onClick={handleGoogleLogin} className="w-50 mt-3">
              Google
            </Button>
            <Button variant="info" disabled={loading} onClick={handleFacebookLogin} className="w-50 mt-3">
              Facebook
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
              <Link to="/reset">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        Don't have an account? <Link to="/signup">Create account</Link>
      </div>
    </>
  );
};

export default Login;
