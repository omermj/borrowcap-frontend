import { useState, useEffect, useContext } from "react";
import TableHeader from "../common/Table/TableHeader";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";
import MUITable from "../common/Table/MUITable";

/** Table showing all Active Investments made by the logged in user */

const ActiveInvestments = () => {
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
      field: "amtInvested",
      headerName: "Invested Amount",
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
      field: "fundedDate",
      headerName: "Funded Date",
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
      field: "remainingBalance",
      headerName: "Remaining Balance",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
  ];

  // get active investments on initial render
  useEffect(() => {
    async function fetchActiveLoans() {
      const requests = await BorrowcapApi.getFundedLoansByUserId(
        currentUser.id
      );
      setData(requests.investor);
    }
    fetchActiveLoans();
  }, []);

  return (
    <div className="mb-4">
      <TableHeader text={"Investments"} />
      {!data.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No active investments.</small>
        </div>
      ) : (
        <MUITable headers={columns} tableData={data} />
      )}
    </div>
  );
};

export default ActiveInvestments;
