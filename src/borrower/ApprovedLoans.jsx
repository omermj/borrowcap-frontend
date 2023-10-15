import { useState, useEffect, useContext } from "react";
import TableComponent from "../common/TableComponent";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  formatBoolean,
} from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";

/** Table showing all Active Loan Requests for logged in user */

const ApprovedLoans = () => {
  const { currentUser } = useContext(UserContext);
  const [approvedLoans, setApprovedLoans] = useState([]);

  // Define table headers with labels and formatters
  const headers = {
    id: { label: "ID", formatter: "none" },
    amtRequested: {
      label: "Requested Amount",
      formatter: formatCurrency,
    },
    amtApproved: {
      label: "Approved Amount",
      formatter: formatCurrency,
    },
    amtFunded: {
      label: "Funded Amount",
      formatter: formatCurrency,
    },
    purpose: { label: "Purpose", formatter: null },
    appApprovedDate: { label: "Approval Date", formatter: formatDate },
    fundingDeadline: { label: "Funding Deadline", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: null },
    installmentAmt: { label: "Installment", formatter: formatCurrency },
    availableForFunding: { label: "Funding Active", formatter: formatBoolean },
    manage: {
      label: "Manage",
      formatter: "button",
      link: "/borrower/approvedrequests",
    },
  };

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchLoanRequests() {
      const requests = await BorrowcapApi.getApprovedRequestsByBorrowerId(
        currentUser.id
      );
      setApprovedLoans(requests);
    }
    fetchLoanRequests();
  }, [currentUser.id]);

  if (!approvedLoans.length) return <div></div>;

  return (
    <div>
      <p>Approved Loan Requests</p>
      <TableComponent headers={headers} tableData={approvedLoans} />
    </div>
  );
};

export default ApprovedLoans;
