import { Container, Row, Col } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

/** Sidebar Component */

const Sidebar = () => {
  const { currentUser } = useContext(UserContext);

  const borrowerSidebar = () => {
    return (
      <Col className="Sidebar col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
            <li className="nav-item">
              <Link to="/" className="nav-link align-middle px-0">
                <i className="fs-5 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/borrower/apply" className="nav-link px-0 align-middle">
                <i className="fs-5 bi-coin"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Apply</span>
              </Link>
            </li>
            <li>
              <Link
                to="#submenu1"
                data-bs-toggle="collapse"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Applications</span>{" "}
              </Link>
              <ul
                className="collapse show nav flex-column ms-1 sidebar-collapse-transition"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <Link to="/borrower/activerequests" className="nav-link px-0">
                    <i className="fs-5 bi-file-spreadsheet"></i>{" "}
                    <span className="d-none d-sm-inline">Requests</span>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/borrower/approvedloans" className="nav-link px-0">
                    <i className="fs-5 bi-list-check"></i>{" "}
                    <span className="d-none d-sm-inline">Approved</span>{" "}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/borrower/fundedloans"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-cash-coin"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Loans</span>
              </Link>
            </li>
            <li>
              <Link
                to="/borrower/wallet"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-wallet-fill"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Wallet</span>
              </Link>
            </li>
          </ul>
        </div>
      </Col>
    );
  };

  const investorSidebar = () => {
    return (
      <Col className="Sidebar col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
            <li className="nav-item">
              <Link to="/" className="nav-link align-middle px-0">
                <i className="fs-5 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/investor/availableinvestments"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-coin"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Invest</span>
              </Link>
            </li>
            <li>
              <Link
                to="/investor/pledges"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-clipboard-check-fill"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Pledges</span>
              </Link>
            </li>
            <li>
              <Link
                to="/investor/activeinvestments"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-cash-coin"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Investments</span>
              </Link>
            </li>
            <li>
              <Link
                to="/investor/wallet"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-wallet-fill"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Wallet</span>
              </Link>
            </li>
          </ul>
        </div>
      </Col>
    );
  };

  const underwriterSidebar = () => {
    return (
      <Col className="Sidebar col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
            <li className="nav-item">
              <Link to="/" className="nav-link align-middle px-0">
                <i className="fs-5 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/underwriter/requests"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-cash"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Requests</span>
              </Link>
            </li>
            <li>
              <Link
                to="/underwriter/approved"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-5 bi-clipboard-check-fill"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Approved</span>
              </Link>
            </li>
          </ul>
        </div>
      </Col>
    );
  };

  const loggedOutSidebar = () => {
    return null;
  };

  let sidebarToDisplay = null;
  if (currentUser) {
    if (currentUser.roles.includes("admin"))
      sidebarToDisplay = underwriterSidebar;
    else if (currentUser.roles.includes("borrower"))
      sidebarToDisplay = borrowerSidebar;
    else if (currentUser.roles.includes("investor"))
      sidebarToDisplay = investorSidebar;
  } else sidebarToDisplay = () => <div></div>;

  return sidebarToDisplay();
};

export default Sidebar;
