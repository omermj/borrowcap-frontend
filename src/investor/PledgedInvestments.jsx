import { useState, useEffect, useContext } from "react";
import TableComponent from "../common/TableComponent";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";

/** Table showing all Active Investments made by the logged in user */

const PledgedInvestments = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(UserContext);

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
      const requests = await BorrowcapApi.getPledgedInvestmentsByInvestorId(
        currentUser.id
      );
      setData(requests);
    }
    fetchPledgedInvestments();
  }, [currentUser.id]);

  if (!data.length) return <div></div>;

  return (
    <div>
      <p>Pledged Investments</p>
      <TableComponent headers={headers} tableData={data} />
    </div>
  );
};

export default PledgedInvestments;
