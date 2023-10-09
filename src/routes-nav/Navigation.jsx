import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  const BorrowerNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link>Apply for Loan</Nav.Link>
        <Nav.Link>Applications</Nav.Link>
        <Nav.Link>Loans</Nav.Link>
        <Nav.Link>Wallet</Nav.Link>
        <Nav.Link>Logout</Nav.Link>
      </Nav>
    );
  };

  const InvestorNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link>Investments</Nav.Link>
        <Nav.Link>Pledges</Nav.Link>
        <Nav.Link>Wallet</Nav.Link>
        <Nav.Link>Logout</Nav.Link>
      </Nav>
    );
  };

  const UnderwriterNav = () => {
    return (
      <Nav className="ms-auto">
        <Nav.Link>Requests</Nav.Link>
        <Nav.Link>Approved</Nav.Link>
        <Nav.Link>Logout</Nav.Link>
      </Nav>
    );
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
      <Container>
        <Navbar.Brand>BorrowCap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">{BorrowerNav()}</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
