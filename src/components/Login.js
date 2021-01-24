import React, { useRef, useState, Suspense } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

//const MatButton = React.lazy(() =>
const MatButton = React.lazy(() => import("./CustomButtons/Button"));
//);

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const {
    login,
    googleLogin,
    facebookLogin,
    twitterLogin,
    currentUser,
  } = useAuth();

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
    } catch (e) {
      setError(e.message);
      console.log(e);
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
      history.push("/");
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
    setLoading(false);
  };

  const handletwitterLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const result = await twitterLogin();
      const user = await result.user;
      console.log(result);
      console.log(user);
      console.log(currentUser);
      history.push("/");
    } catch (e) {
      setError(e.message);
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Suspense
                fallback={<Spinner animation="border" variant="secondary" />}
              >
                <MatButton
                  onClick={handleGoogleLogin}
                  size="lg"
                  justIcon
                  round
                  color="google"
                >
                  <i className={"fab fa-google"} />
                </MatButton>
                <MatButton
                  onClick={handleFacebookLogin}
                  size="lg"
                  justIcon
                  round
                  color="facebook"
                >
                  <i className={"fab fa-facebook-f"} />
                </MatButton>
                <MatButton
                  onClick={handletwitterLogin}
                  size="lg"
                  justIcon
                  round
                  color="twitter"
                >
                  <i className={"fab fa-twitter"} />
                </MatButton>
              </Suspense>
            </div>
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
