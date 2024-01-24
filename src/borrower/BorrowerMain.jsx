import FundedLoans from "./FundedLoans";
import ActiveRequests from "./ActiveRequests";
import ApprovedRequests from "./ApprovedRequests";
import StatCard from "../common/StatCard";

/** Main Landing Page for Borrower */

const BorrowerMain = () => {
  return (
    <div>
      {/* Stat cards */}
      <div
        className="mb-4 d-flex flex-column flex-md-row 
          justify-content-between"
      >
        <StatCard title="Funded Loans" icon="bi-coin" />
        <StatCard title="Approved Loans" icon="bi-cash-stack" />
        <StatCard title="Installments" icon="bi-receipt" />
        <StatCard title="WALLET BALANCE" icon="bi-wallet-fill" />
      </div>

      {/* Funded Loans */}
      <FundedLoans />

      {/* Approved Loan Requests */}
      <ApprovedRequests />

      {/* Active Loan Requests */}
      <ActiveRequests />
    </div>
  );
};

export default BorrowerMain;
