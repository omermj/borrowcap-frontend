import { useState, useEffect } from "react";
import TableComponent from "../common/TableComponent";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";

/** Table showing all Active Investments made by the logged in user */

const AvailableInvestments = () => {
  const [data, setData] = useState([]);

  const investIcon = () => {
    return <i className="bi-bank"></i>;
  };

  // Define table headers with labels and formatters
  const headers = {
    id: { label: "ID", formatter: null },
    amtApproved: { label: "Approved Amount", formatter: formatCurrency },
    amtFunded: { label: "Funded Amount", formatter: formatCurrency },
    purpose: { label: "Purpose", formatter: null },
    approvedDate: { label: "Approved Date", formatter: formatDate },
    fundingDeadline: { label: "Funding Deadline", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: null },
    investBtn: {
      label: "Invest",
      formatter: "button",
      link: "/investor/availableinvestment",
      icon: investIcon,
    },
  };

  // get active investments on initial render
  useEffect(() => {
    async function fetchAvailableInvestments() {
      const requests = await BorrowcapApi.getAvailableInvestments();
      setData(requests);
    }
    fetchAvailableInvestments();
  }, []);

  if (!data.length) return <div></div>;

  return (
    <div>
      <p>Available Investments</p>
      <TableComponent headers={headers} tableData={data} />
    </div>
  );
};

export default AvailableInvestments;
