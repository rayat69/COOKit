import { lazy, Suspense } from "react";
import Signup from "./components/Signup";
import { Container, Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
//import Dashboard from "./components/Dashboard";
//import Login from "./components/Login";
//import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Login = lazy(() => import("./components/Login"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));

const App = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxHeight: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Suspense
                fallback={<Spinner animation="border" variant="secondary" />}
              >
                <PrivateRoute path="/" exact component={Dashboard} />
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/reset">
                  <ForgotPassword />
                </Route>
              </Suspense>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
};

export default App;
