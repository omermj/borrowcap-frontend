import { useState, useEffect, useContext } from "react";
import TableComponent from "../common/TableComponent";
import TableHeader from "../common/Table/TableHeader";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";

/** Table showing all Active Investments made by the logged in user */

const PledgedInvestments = () => {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState([]);

  // Define table headers with labels and formatters
  const headers = {
    id: { label: "ID", formatter: "none" },
    amtApproved: { label: "Approved Amount", formatter: formatCurrency },
    amtPledged: { label: "Pledged Amount", formatter: formatCurrency },
    approvedDate: { label: "Approved Date", formatter: formatDate },
    fundingDeadline: { label: "Funding Deadline", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: "none" },
  };

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
    <div className="border mb-4">
      <TableHeader text={"Pledged Investments"} />
      {!data.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No pledged investments.</small>
        </div>
      ) : (
        <TableComponent headers={headers} tableData={data} />
      )}
    </div>
  );
};

export default PledgedInvestments;
