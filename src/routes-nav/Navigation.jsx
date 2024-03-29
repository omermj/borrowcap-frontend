import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import NavigationLogo from "../common/NavigationLogo";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.user);

  const userstamp = () => {
    return (
      <span>
        {currentUser.firstName} <i className="fs-6 bi-person"></i>
      </span>
    );
  };

  const LoggedInNav = () => {
    return (
      <Nav className="ms-auto ">
        <Nav.Link as={Link} to="/user/profile">
          {" "}
          <span>Profile</span>{" "}
        </Nav.Link>
        <NavDropdown title={userstamp()} id="nav-dropdown" align={"end"}>
          <NavDropdown.Item as={Link} to="/user/changepassword">
            Change Password
          </NavDropdown.Item>
          <NavDropdown.Item
            as={Link}
            to="/"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  };

  const LoggedOutNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/signup">
          Signup
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      </Nav>
    );
  };

  let navToDisplay = null;
  if (currentUser) navToDisplay = LoggedInNav;
  else navToDisplay = LoggedOutNav;

  return (
    <Navbar bg="light" data-bs-theme="light" expand="sm">
      <div className="container-fluid">
        {!currentUser && (
          <Navbar.Brand as={Link} to="/">
            <div className="d-flex align-items-center">
              <NavigationLogo />
              <span>BorrowCap</span>
            </div>
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {navToDisplay()}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
