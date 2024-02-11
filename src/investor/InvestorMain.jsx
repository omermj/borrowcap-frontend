import ActiveInvestments from "./ActiveInvestments";
import AvailableInvestments from "./AvailableInvestments";
import PledgedInvestments from "./PledgedInvestments";
import StatCard from "../common/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../features/stats/statsSlice";
import { useEffect } from "react";
import { formatCurrency, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";

/** Main Landing Page for Investor */

const InvestorMain = () => {
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
          title="Investments"
          icon="bi-coin"
          mainNumber={formatCurrency(stats.data.investor.investments)}
        />
        <StatCard
          title="Avg Return"
          icon="bi-percent"
          mainNumber={formatPercent(stats.data.investor.avgReturns)}
        />
        <StatCard
          title="Monthly Inflow"
          icon="bi-receipt"
          mainNumber={formatCurrency(stats.data.investor.monthlyInflows)}
        />
        <StatCard
          title="WALLET BALANCE"
          icon="bi-wallet-fill"
          mainNumber={formatCurrency(currentUser.accountBalance)}
        />
      </div>
      {/* Active Investments */}
      <ActiveInvestments />
      {/* Pledged Investments */}
      <PledgedInvestments />
      {/* Available Investment Opportunities */}
      <AvailableInvestments />
    </div>
  );
};

export default InvestorMain;
