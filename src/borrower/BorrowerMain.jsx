import FundedLoans from "./FundedLoans";
import ActiveRequests from "./ActiveRequests";
import QuickLinks from "../common/QuickLinks";
import ApprovedLoans from "./ApprovedLoans";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../routes-nav/Sidebar";

/** Main Landing Page for Borrower */

const BorrowerMain = () => {
  const quickLinks = [
    { label: "Apply for new loan", link: "http://www.google.ca" },
    { label: "Pay loan installment", link: "http://www.google.ca" },
    { label: "Pay loan principal", link: "http://www.google.ca" },
    { label: "Manage Wallet", link: "http://www.google.ca" },
  ];

  return (
    <div>
      {/* Active Loan Requests */}
      <ActiveRequests />

      {/* Approved Loan Requests */}
      <ApprovedLoans />

      {/* Funded Loans */}
      <FundedLoans />
    </div>
  );
};

export default BorrowerMain;
