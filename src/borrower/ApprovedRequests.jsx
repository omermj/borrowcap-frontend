import { useState, useEffect, useContext } from "react";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  formatBoolean,
} from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";
import TableComponent from "../common/TableComponent";
import TableHeader from "../common/TableHeader";

/** Table showing all Active Loan Requests for logged in user */

const ApprovedRequests = () => {
  const { currentUser } = useContext(UserContext);
  const [approvedLoans, setApprovedLoans] = useState([]);

  const manageIcon = () => {
    return <i className="bi-gear-wide-connected"></i>;
  };

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
      icon: manageIcon,
    },
  };

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchLoanRequests() {
      const approvedRequests = await BorrowcapApi.getApprovedRequestsByUserId(
        currentUser.id
      );
      if (approvedRequests) setApprovedLoans(approvedRequests.borrower);
    }
    fetchLoanRequests();
  }, [currentUser.id]);

  return (
    <div className="border mb-4">
      <TableHeader text={"Approved Loan Requests"} />
      {!approvedLoans || !approvedLoans.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No approved loan requests.</small>
        </div>
      ) : (
        <TableComponent headers={headers} tableData={approvedLoans} />
      )}
    </div>
  );
};

export default ApprovedRequests;
