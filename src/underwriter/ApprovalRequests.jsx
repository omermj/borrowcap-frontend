import { useState, useEffect } from "react";
import TableHeader from "../common/Table/TableHeader";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import MUITable from "../common/Table/MUITable";
import TableButton from "../common/Table/TableButton";
import { useSelector } from "react-redux";

const reviewIcon = () => {
  return <i className="bi-pencil-fill"></i>;
};

/** Table showing all Active Loan Requests for logged in user */
const ApprovalRequests = () => {
  const currentUser = useSelector((state) => state.userState.user);
  const [loanRequests, setLoanRequests] = useState([]);

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
      field: "purpose",
      headerName: "Purpose",
      minWidth: 100,
      flex: 0.75,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "appOpenDate",
      headerName: "Application Date",
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
    {
      field: "review",
      headerName: "Review",
      minWidth: 100,
      flex: 0.75,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
        };
        return (
          <TableButton
            icon={reviewIcon}
            link={`/underwriter/reviewrequest/${params.id}`}
          />
        );
      },
    },
  ];

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchLoanRequests() {
      BorrowcapApi.token = currentUser.token;
      const requests = await BorrowcapApi.getLoanRequests();
      setLoanRequests(requests);
    }
    fetchLoanRequests();
  }, []);

  return (
    <div className="mb-4">
      <TableHeader text={"Approval Requests"} />
      {!loanRequests.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No approval requests.</small>
        </div>
      ) : (
        // <TableComponent headers={headers} tableData={loanRequests} />
        <MUITable headers={columns} tableData={loanRequests} />
      )}
    </div>
  );
};

export default ApprovalRequests;
