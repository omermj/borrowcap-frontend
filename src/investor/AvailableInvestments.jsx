import { useState, useEffect } from "react";
import TableComponent from "../common/TableComponent";
import TableHeader from "../common/Table/TableHeader";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import MUITable from "../common/Table/MUITable";
import TableButton from "../common/Table/TableButton";

const investIcon = () => {
  return <i className="bi-bank"></i>;
};

/** Table showing all Active Investments made by the logged in user */
const AvailableInvestments = () => {
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
    {
      field: "invest",
      headerName: "Invest",
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
            icon={investIcon}
            link={`/investor/availableinvestment/${params.id}`}
          />
        );
      },
    },
  ];

  // get active investments on initial render
  useEffect(() => {
    async function fetchAvailableInvestments() {
      const requests = await BorrowcapApi.getAvailableInvestments();
      setData(requests);
    }
    fetchAvailableInvestments();
  }, []);

  return (
    <div className="mb-4">
      <TableHeader text={"Available Investments"} />
      {!data.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No available investments.</small>
        </div>
      ) : (
        <MUITable headers={columns} tableData={data} />
      )}
    </div>
  );
};

export default AvailableInvestments;
