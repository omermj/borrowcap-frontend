import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  formatBoolean,
} from "../helpers/format";
import BorrowcapApi from "../api/api";
import TableHeader from "../common/Table/TableHeader";
import MUITable from "../common/Table/MUITable";
import TableButton from "../common/Table/TableButton";

const manageIcon = () => {
  return <i className="bi-gear-wide-connected"></i>;
};

/** Table showing all Active Loan Requests for logged in user */
const ApprovedRequests = () => {
  const currentUser = useSelector((state) => state.userState.user);
  const [approvedLoans, setApprovedLoans] = useState([]);

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
      field: "amtFunded",
      headerName: "Funded Amount",
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
      field: "fundingDeadline",
      headerName: "Funding Deadline",
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
      field: "availableForFunding",
      headerName: "Funding Active",
      minWidth: 120,
      flex: 0.75,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatBoolean(value),
    },
    {
      field: "manage",
      headerName: "Manage",
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
      BorrowcapApi.token = currentUser.token;
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
        <div>
          <MUITable headers={columns} tableData={approvedLoans} />
        </div>
      )}
    </div>
  );
};

export default ApprovedRequests;
