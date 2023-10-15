import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavRoutes from "./routes-nav/NavRoutes";
import Navigation from "./routes-nav/Navigation";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import BorrowcapApi from "./api/api";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";

// Key for storing token in localStorage
export const TOKEN_STORAGE_ID = "borrowcap-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [purposes, setPurposes] = useState([]);

  // Effect for token refresh
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          BorrowcapApi.token = token;
          const currentUser = await BorrowcapApi.getCurrentUser(username);
          const roles = await BorrowcapApi.getRoles();
          const purposes = await BorrowcapApi.getPurposes();
          setCurrentUser(currentUser);
          setRoles(roles);
          setPurposes(purposes);
        } catch (e) {
          setCurrentUser(null);
        }
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
    console.log("Logout triggered");
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
      return { success: false };
    }
  };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, BorrowcapApi }}
      >
        <>
          <Navigation logout={logout} />
          <NavRoutes
            login={login}
            signup={signup}
            roles={roles}
            purposes={purposes}
          />
        </>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
