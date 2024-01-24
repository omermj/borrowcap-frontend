import { useState, useEffect, useContext } from "react";
import TableHeader from "../common/Table/TableHeader";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";
import MUITable from "../common/Table/MUITable";

/** Table showing all Active Investments made by the logged in user */

const PledgedInvestments = () => {
  const { currentUser } = useContext(UserContext);
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
      field: "amtApproved",
      headerName: "Approved Amount",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "amtPledged",
      headerName: "Pledged Amount",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "approvedDate",
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
  ];

  // get active investments on initial render
  useEffect(() => {
    async function fetchPledgedInvestments() {
      const pledgedInvestments = await BorrowcapApi.getApprovedRequestsByUserId(
        currentUser.id
      );
      setData(pledgedInvestments.investor);
    }
    fetchPledgedInvestments();
  }, [currentUser.id]);

  return (
    <div className="mb-4">
      <TableHeader text={"Pledges"} />
      {!data.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No pledged investments.</small>
        </div>
      ) : (
        <MUITable headers={columns} tableData={data} />
      )}
    </div>
  );
};

export default PledgedInvestments;
