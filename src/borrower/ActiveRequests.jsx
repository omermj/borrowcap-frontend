import { useState, useEffect } from "react";
import TableComponent from "../common/TableComponent";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";

/** Table showing all Active Loan Requests for logged in user */

const ActiveRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);

  // Define table headers with labels and formatters
  const headers = {
    id: { label: "ID", formatter: "none" },
    amtRequested: {
      label: "Requested Amount",
      formatter: formatCurrency,
    },
    purpose: { label: "Purpose", formatter: "none" },
    appOpenDate: { label: "Application Date", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: "none" },
    installmentAmt: { label: "Installment", formatter: formatCurrency },
  };

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchLoanRequests() {
      const requests = await BorrowcapApi.getLoanRequestsByBorrowerId(1);
      setLoanRequests(requests);
    }
    fetchLoanRequests();
  }, []);

  if (!loanRequests.length) return <div></div>;

  return (
    <div>
      <p>Loan Requests</p>
      <TableComponent headers={headers} tableData={loanRequests} />
    </div>
  );
};

export default ActiveRequests;
