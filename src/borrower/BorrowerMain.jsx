import FundedLoans from "./ActiveLoans";
import ActiveRequests from "./ActiveRequests";

/** Main Landing Page for Borrower */

const BorrowerMain = () => {
  return (
    <div>
      {/* Active Loan Requests */}
      <ActiveRequests />

      {/* Funded Loans */}
      <FundedLoans />

      {/* Quick Links */}
    </div>
  );
};

export default BorrowerMain;
