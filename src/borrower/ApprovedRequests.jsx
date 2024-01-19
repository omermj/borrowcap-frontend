import { useState, useEffect, useContext } from "react";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  formatBoolean,
} from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";
import TableHeader from "../common/Table/TableHeader";
import MUITable from "../common/Table/MUITable";
import { Link } from "react-router-dom";
import TableButton from "../common/Table/TableButton";

const manageIcon = () => {
  return <i className="bi-gear-wide-connected"></i>;
};

/** Table showing all Active Loan Requests for logged in user */
const ApprovedRequests = () => {
  const { currentUser } = useContext(UserContext);
  const [approvedLoans, setApprovedLoans] = useState([]);

  // Define table headers with labels and formatters
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
      field: "amtApproved",
      headerName: "Approved Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
      minWidth: 150,
    },
    {
      field: "amtFunded",
      headerName: "Funded Amount",
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
      field: "appApprovedDate",
      headerName: "Approval Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatDate(value),
      minWidth: 150,
    },
    {
      field: "fundingDeadline",
      headerName: "Funding Deadline",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatDate(value),
      minWidth: 150,
    },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      flex: 0.5,
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
    {
      field: "availableForFunding",
      headerName: "Funding Active",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatBoolean(value),
      minWidth: 150,
    },
    {
      field: "manage",
      headerName: "Manage",
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
            icon={manageIcon}
            link={`/borrower/approvedrequests/${params.id}`}
          />
        );
      },
    },
  ];

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
    <div className="mb-4">
      <TableHeader text={"Approved Loan Requests"} />
      {!approvedLoans || !approvedLoans.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No approved loan requests.</small>
        </div>
      ) : (
        <MUITable headers={columns} tableData={approvedLoans} />
      )}
    </div>
  );
};

export default ApprovedRequests;
