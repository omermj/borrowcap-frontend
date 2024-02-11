import FundedLoans from "./FundedLoans";
import ActiveRequests from "./ActiveRequests";
import ApprovedRequests from "./ApprovedRequests";
import StatCard from "../common/StatCard";
import { useEffect, useState } from "react";
import { formatCurrency } from "../helpers/format";
import BorrowcapApi from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { fetchStats } from "../features/stats/statsSlice";

/** Main Landing Page for Borrower */

const BorrowerMain = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.user);
  const stats = useSelector((state) => state.statsState);

  useEffect(() => {
    async function updateUserData() {
      BorrowcapApi.token = currentUser.token;
      const user = await BorrowcapApi.getCurrentUser(currentUser.username);
      dispatch(fetchStats(currentUser));
    }
    updateUserData();
  }, [currentUser, dispatch]);

  return (
    <div>
      {/* Stat cards */}
      <div
        className="mb-4 d-flex flex-column flex-md-row 
          justify-content-between"
      >
        <StatCard
          title="Funded Loans"
          icon="bi-coin"
          mainNumber={formatCurrency(stats.data.borrower.fundedLoans)}
        />
        <StatCard
          title="Approved Loans"
          icon="bi-cash-stack"
          mainNumber={formatCurrency(stats.data.borrower.approvedLoans)}
        />
        <StatCard
          title="Installments"
          icon="bi-receipt"
          mainNumber={formatCurrency(stats.data.borrower.installments)}
        />
        <StatCard
          title="WALLET BALANCE"
          icon="bi-wallet-fill"
          mainNumber={formatCurrency(currentUser.accountBalance)}
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
