import FundedLoans from "./ActiveLoans";
import ActiveRequests from "./ActiveRequests";
import QuickLinks from "./QuickLinks";

/** Main Landing Page for Borrower */

const BorrowerMain = () => {
  return (
    <div>
      {/* Active Loan Requests */}
      <ActiveRequests />

      {/* Funded Loans */}
      <FundedLoans />

      {/* Quick Links */}
      <QuickLinks />
    </div>
  );
};

export default BorrowerMain;
