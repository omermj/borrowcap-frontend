import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import NavRoutes from "./routes-nav/NavRoutes";
import Navigation from "./routes-nav/Navigation";
import useLocalStorage from "./hooks/useLocalStorage";
import jwtDecode from "jwt-decode";
import BorrowcapApi from "./api/api";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";
import Sidebar from "./routes-nav/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./routes-nav/Sidebar.css";

// Key for storing token in localStorage
export const TOKEN_STORAGE_ID = "borrowcap-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [terms, setTerms] = useState([]);

  // Effect for token refresh
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        if (token) {
          const { username } = jwtDecode(token);
          BorrowcapApi.token = token;
          const currentUser = await BorrowcapApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } else {
          setCurrentUser(null);
        }

        const roles = await BorrowcapApi.getRoles();
        const purposes = await BorrowcapApi.getPurposes();
        const terms = await BorrowcapApi.getTerms();
        setRoles(roles);
        setPurposes(purposes);
        setTerms(terms);
      } catch (e) {
        setCurrentUser(null);
      }

      setInfoLoaded(true);
    };
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // login user
  const login = async (loginData) => {
    try {
      const token = await BorrowcapApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (e) {
      console.error("Login failed", e);
      return { success: false, e };
    }
  };

  // logout user
  const logout = async () => {
    setToken(null);
    setCurrentUser(null);
  };

  // signup
  const signup = async (signupData) => {
    try {
      const token = await BorrowcapApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (e) {
      console.error("signup failed", e);
      return { success: false, errors: e };
    }
  };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, BorrowcapApi }}
      >
        {/* TOP NAVIGATION */}
        <Navigation logout={logout} />
        {/* BODY */}
        <Container fluid className="">
          <Row className="flex-nowrap">
            {/* SIDEBAR */}
            {currentUser && (
              <Col className="Sidebar col-sm-2 d-flex flex-column flex-shrink-0 px-sm-2 px-0 bg-dark">
                <Sidebar />
              </Col>
            )}
            {/* PAGE CONTENT */}
            <Col
              className={`col-sm-${
                currentUser ? "10" : "12"
              } mt-4 d-flex flex-column`}
            >
              <NavRoutes
                className="flex-grow-1"
                login={login}
                signup={signup}
                roles={roles}
                purposes={purposes}
                terms={terms}
              />
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
