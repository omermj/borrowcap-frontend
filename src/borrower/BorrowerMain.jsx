import FundedLoans from "./FundedLoans";
import ActiveRequests from "./ActiveRequests";
import ApprovedRequests from "./ApprovedRequests";

/** Main Landing Page for Borrower */

const BorrowerMain = () => {
  return (
    <div>
      {/* Active Loan Requests */}
      <ActiveRequests />

      {/* Approved Loan Requests */}
      <ApprovedRequests />

      {/* Funded Loans */}
      <FundedLoans />
    </div>
  );
};

export default BorrowerMain;
