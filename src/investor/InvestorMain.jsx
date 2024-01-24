import ActiveInvestments from "./ActiveInvestments";
import AvailableInvestments from "./AvailableInvestments";
import PledgedInvestments from "./PledgedInvestments";
import StatCard from "../common/StatCard";

/** Main Landing Page for Investor */

const InvestorMain = () => {
  return (
    <div>
      {/* Stat cards */}
      <div
        className="mb-4 d-flex flex-column flex-md-row 
          justify-content-between"
      >
        <StatCard title="Investments" icon="bi-coin" />
        <StatCard title="Avg Return" icon="bi-percent" />
        <StatCard title="Cash Inflow" icon="bi-receipt" />
        <StatCard title="WALLET BALANCE" icon="bi-wallet-fill" />
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
