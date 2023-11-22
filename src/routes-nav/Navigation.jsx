import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import { useContext } from "react";

const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

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
            onClick={async () => await logout()}
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
    <Navbar bg="dark" data-bs-theme="dark" className="" expand="sm" >
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          BorrowCap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {navToDisplay()}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
