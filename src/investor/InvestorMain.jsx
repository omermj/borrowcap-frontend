import ActiveInvestments from "./ActiveInvestments";
import AvailableInvestments from "./AvailableInvestments";
import PledgedInvestments from "./PledgedInvestments";
import QuickLinks from "../common/QuickLinks";

/** Main Landing Page for Investor */

const InvestorMain = () => {
  const quickLinks = [
    { label: "Manage Wallet", link: "http://www.google.ca" },
    { label: "Invest in a loan", link: "http://www.google.ca" },
  ];

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
