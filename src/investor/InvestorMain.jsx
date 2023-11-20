import ActiveInvestments from "./ActiveInvestments";
import AvailableInvestments from "./AvailableInvestments";
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
      <AvailableInvestments />
    </div>
  );
};

export default InvestorMain;
