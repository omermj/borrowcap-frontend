import { useState, useEffect, useContext } from "react";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import UserContext from "../auth/UserContext";
import BorrowcapApi from "../api/api";
import TableHeader from "../common/Table/TableHeader";
import MUITable from "../common/Table/MUITable";

/** Table showing all Active Loan Requests for logged in user */

const ActiveRequests = () => {
  const { currentUser } = useContext(UserContext);
  const [loanRequests, setLoanRequests] = useState([]);

  // Table headers
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      minWidth: 50,
    },
    {
      field: "amtRequested",
      headerName: "Requested Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
      minWidth: 150,
    },
    {
      field: "purpose",
      headerName: "Purpose",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "appOpenDate",
      headerName: "Application Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatDate(value),
      minWidth: 150,
    },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatPercent(value),
      minWidth: 150,
    },
    {
      field: "term",
      headerName: "Term",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      minWidth: 50,
    },
    {
      field: "installmentAmt",
      headerName: "Installment",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
      minWidth: 150,
    },
  ];

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
    <div className="mb-4">
      <TableHeader text={"New Loan Requests"} />
      {!loanRequests.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No active loan requests.</small>
        </div>
      ) : (
        <MUITable headers={columns} tableData={loanRequests} />
      )}
    </div>
  );
};

export default ActiveRequests;
