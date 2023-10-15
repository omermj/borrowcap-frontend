import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import { useContext } from "react";

const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const BorrowerNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link href="/borrower/apply" >Apply for Loan</Nav.Link>
        <Nav.Link>Applications</Nav.Link>
        <Nav.Link>Loans</Nav.Link>
        <Nav.Link>Wallet</Nav.Link>
        <Nav.Link onClick={logout}>Logout {currentUser.username}</Nav.Link>
      </Nav>
    );
  };

  const InvestorNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link>Investments</Nav.Link>
        <Nav.Link>Pledges</Nav.Link>
        <Nav.Link>Wallet</Nav.Link>
        <Nav.Link onClick={logout}>Logout {currentUser.username}</Nav.Link>
      </Nav>
    );
  };

  const UnderwriterNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link>Requests</Nav.Link>
        <Nav.Link>Approved</Nav.Link>
        <Nav.Link href="/" onClick={async () => await logout()}>
          Logout {currentUser.username}
        </Nav.Link>
      </Nav>
    );
  };

  const LoggedOutNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link href="/signup">Signup</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    );
  };

  let navToDisplay = null;
  if (currentUser) {
    if (currentUser.roles.includes("admin")) navToDisplay = UnderwriterNav;
    else if (currentUser.roles.includes("borrower")) navToDisplay = BorrowerNav;
    else if (currentUser.roles.includes("investor")) navToDisplay = InvestorNav;
  } else navToDisplay = LoggedOutNav;

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="/">BorrowCap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {navToDisplay()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
