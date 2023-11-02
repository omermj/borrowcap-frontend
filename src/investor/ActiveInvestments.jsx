import { useState, useEffect, useContext } from "react";
import TableComponent from "../common/TableComponent";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import BorrowcapApi from "../api/api";
import UserContext from "../auth/UserContext";

/** Table showing all Active Investments made by the logged in user */

const ActiveInvestments = () => {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState([]);

  // Define table headers with labels and formatters
  const headers = {
    id: { label: "ID", formatter: "none" },
    amtInvested: { label: "Invested Amount", formatter: formatCurrency },
    amtFunded: { label: "Loan Amount", formatter: formatCurrency },
    fundedDate: { label: "Funded Date", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: "none" },
    installmentAmt: { label: "Installment Amount", formatter: formatCurrency },
    remainingBalance: { label: "Remaining Balance", formatter: formatCurrency },
  };

  // get active investments on initial render
  useEffect(() => {
    async function fetchActiveLoans() {
      const requests = await BorrowcapApi.getFundedLoansByUserId(currentUser.id);
      setData(requests.investor);
    }
    fetchActiveLoans();
  }, []);

  if (!data.length) return <div></div>;

  return (
    <div>
      <p>Active Investments</p>
      <TableComponent headers={headers} tableData={data} />
    </div>
  );
};

export default ActiveInvestments;
