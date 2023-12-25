import { useState, useEffect, useContext } from "react";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import UserContext from "../auth/UserContext";
import BorrowcapApi from "../api/api";
import TableComponent from "../common/TableComponent";
import TableHeader from "../common/TableHeader";

/** Table showing all Active Loan Requests for logged in user */

const ActiveRequests = () => {
  const { currentUser } = useContext(UserContext);
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
      const requests = await BorrowcapApi.getActiveRequestsByBorrowerId(
        currentUser.id
      );
      setLoanRequests(requests);
    }
    fetchLoanRequests();
  }, [currentUser.id]);

  return (
    <div className="border mb-4">
      <TableHeader text={"New Loan Requests"} />
      {!loanRequests.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No active loan requests.</small>
        </div>
      ) : (
        <TableComponent headers={headers} tableData={loanRequests} />
      )}
    </div>
  );
};

export default ActiveRequests;
