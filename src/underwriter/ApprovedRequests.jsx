import { useState, useEffect } from "react";
import TableHeader from "../common/Table/TableHeader";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import MUITable from "../common/Table/MUITable";
import { useSelector } from "react-redux";

/** Table showing all Active Loan Requests for logged in user */

const ApprovedRequests = () => {
  const currentUser = useSelector((state) => state.userState.user);
  const [data, setData] = useState([]);

  // Define table headers with labels and formatters
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "borrowerId",
      headerName: "Borrower ID",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amtRequested",
      headerName: "Requested Amount",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "amtApproved",
      headerName: "Approved Amount",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "purpose",
      headerName: "Purpose",
      minWidth: 100,
      flex: 0.75,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "appApprovedDate",
      headerName: "Approval Date",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      minWidth: 100,
      flex: 0.75,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatPercent(value),
    },
    {
      field: "term",
      headerName: "Term",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "installmentAmt",
      headerName: "Installment",
      minWidth: 120,
      flex: 0.75,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
  ];

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchApprovedRequests() {
      BorrowcapApi.token = currentUser.token;
      const requests = await BorrowcapApi.getApprovedRequests();
      setData(requests);
    }
    fetchApprovedRequests();
  }, []);

  return (
    <div className="mb-4">
      <TableHeader text={"Approved Requests"} />
      {!data.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No approved requests.</small>
        </div>
      ) : (
        <MUITable headers={columns} tableData={data} />
      )}
    </div>
  );
};

export default ApprovedRequests;
