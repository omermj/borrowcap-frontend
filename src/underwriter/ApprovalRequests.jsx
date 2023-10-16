import { useState, useEffect } from "react";
import TableComponent from "../common/TableComponent";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";

/** Table showing all Active Loan Requests for logged in user */

const ApprovalRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);

  // Define table headers with labels and formatters
  const headers = {
    id: { label: "App ID", formatter: "none" },
    borrowerId: { label: "Borrower ID", formatter: "none" },
    amtRequested: {
      label: "Requested Amount",
      formatter: formatCurrency,
    },
    purpose: { label: "Purpose", formatter: "none" },
    appOpenDate: { label: "Application Date", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: "none" },
    installmentAmt: { label: "Installment", formatter: formatCurrency },
    reviewBtn: {
      label: "Review",
      formatter: "button",
      link: "/underwriter/reviewrequest",
      onClick: null,
    },
  };

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchLoanRequests() {
      const requests = await BorrowcapApi.getLoanRequests();
      setLoanRequests(requests);
    }
    fetchLoanRequests();
  }, []);

  if (!loanRequests.length) return <div></div>;

  return (
    <div>
      <p>Approval Requests</p>
      <TableComponent headers={headers} tableData={loanRequests} />
    </div>
  );
};

export default ApprovalRequests;
