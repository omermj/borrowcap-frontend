import ActiveInvestments from "./ActiveInvestments";
import PledgedInvestments from "./PledgedInvestments";

/** Main Landing Page for Investor */

const InvestorMain = () => {
  return (
    <div>
      {/* Active Investments */}
      <ActiveInvestments />
      {/* Pledged Investments */}
      <PledgedInvestments />
      {/* Available Investment Opportunities */}
      {/* Quick Links */}
    </div>
  );
};

export default InvestorMain;
