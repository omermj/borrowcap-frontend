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

  return (
    <div className="border mb-4">
      <div className="py-2">
        <span className="align-middle h5">Available Investments</span>
      </div>
      {!data.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No available investments.</small>
        </div>
      ) : (
        <TableComponent headers={headers} tableData={data} />
      )}
    </div>
  );
};

export default AvailableInvestments;
