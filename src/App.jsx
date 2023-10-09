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

// Key for storing token in localStorage
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);

  // Effect for token refresh
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          BorrowcapApi.token = token;

          // Set currentUser
          const currentUser = await BorrowcapApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (e) {
          setCurrentUser(null);
        }
      }
    };
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
    setCurrentUser(null);
    setToken(null);
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

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <>
          <Navigation logout={logout} />
          <NavRoutes login={login} signup={signup} />
        </>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
