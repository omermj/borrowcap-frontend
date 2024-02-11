import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavRoutes from "./routes-nav/NavRoutes";
import Navigation from "./routes-nav/Navigation";
import useLocalStorage from "./hooks/useLocalStorage";
import BorrowcapApi from "./api/api";
import LoadingSpinner from "./common/LoadingSpinner";
import SideMenu from "./routes-nav/SideMenu/SideMenu";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "./features/user/userSlice";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";

// Key for storing token in localStorage
export const TOKEN_STORAGE_ID = "borrowcap-token";

function App() {
  const dispatch = useDispatch();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const currentUser = useSelector((state) => state.userState.user);
  const [roles, setRoles] = useState([]);

  // Effect for token refresh
  useEffect(() => {
    const getRoles = async () => {
      try {
        BorrowcapApi.token = token;
        const roles = await BorrowcapApi.getRoles();
        setRoles(roles);
        dispatch(fetchUserData(currentUser));
      } catch (e) {
        console.log("Error: ", e);
      }
      setInfoLoaded(true);
    };
    setInfoLoaded(false);
    getRoles();
  }, [token]);

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
      <div className="d-flex" style={{ minHeight: "100%" }}>
        {/* SIDEBAR */}
        {currentUser && (
          <div>
            <SideMenu />
          </div>
        )}
        <div style={{ minHeight: "100%", width: "100%" }}>
          {/* TOP NAVIGATION */}
          <div>
            <Navigation />
          </div>
          {/* PAGE CONTENT */}
          <div className="m-3">
            <NavRoutes signup={signup} roles={roles} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
