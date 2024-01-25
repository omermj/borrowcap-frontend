import FundedLoans from "./FundedLoans";
import ActiveRequests from "./ActiveRequests";
import ApprovedRequests from "./ApprovedRequests";
import StatCard from "../common/StatCard";
import { useEffect, useState } from "react";
import { formatCurrency } from "../helpers/format";
import BorrowcapApi from "../api/api";
import { useSelector } from "react-redux";

/** Main Landing Page for Borrower */

const BorrowerMain = () => {
  const currentUser = useSelector((state) => state.userState.user);
  const [accountBalance, setAccountBalance] = useState(
    currentUser.accountBalance
  );

  useEffect(() => {
    async function updateUserData() {
      BorrowcapApi.token = currentUser.token;
      const request = await BorrowcapApi.getCurrentUser(currentUser.username);
      setAccountBalance(request.accountBalance);
    }
    updateUserData();
  }, [currentUser]);

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
        <StatCard
          title="WALLET BALANCE"
          icon="bi-wallet-fill"
          mainNumber={formatCurrency(accountBalance)}
        />
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
