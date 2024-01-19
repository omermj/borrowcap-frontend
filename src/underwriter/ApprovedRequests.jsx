import { useState, useEffect } from "react";
import TableComponent from "../common/TableComponent";
import TableHeader from "../common/Table/TableHeader";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";

/** Table showing all Active Loan Requests for logged in user */

const ApprovedRequests = () => {
  const [data, setData] = useState([]);

  // Define table headers with labels and formatters
  const headers = {
    id: { label: "App ID", formatter: "none" },
    borrowerId: { label: "Borrower ID", formatter: "none" },
    amtRequested: {
      label: "Requested Amount",
      formatter: formatCurrency,
    },
    amtApproved: {
      label: "Approved Amount",
      formatter: formatCurrency,
    },
    purpose: { label: "Purpose", formatter: "none" },
    appApprovedDate: { label: "Approval Date", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: "none" },
    installmentAmt: { label: "Installment", formatter: formatCurrency },
  };

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchApprovedRequests() {
      const requests = await BorrowcapApi.getApprovedRequests();
      setData(requests);
    }
    fetchApprovedRequests();
  }, []);

  return (
    <div className="border mb-4">
      <TableHeader text={"Approved Requests"} />
      {!data.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No approved requests.</small>
        </div>
      ) : (
        <TableComponent headers={headers} tableData={data} />
      )}
    </div>
  );
};

export default ApprovedRequests;
