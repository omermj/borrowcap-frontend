import { useState, useEffect, useContext } from "react";
import TableComponent from "../common/TableComponent";
import BorrowcapApi from "../api/api";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import UserContext from "../auth/UserContext";

/** Table showing all Fundend Loans for logged in user */

const FundedLoans = () => {
  const { currentUser } = useContext(UserContext);
  const [fundedLoans, setFundedLoans] = useState([]);
  const headers = {
    id: { label: "ID", formatter: "none" },
    amtFunded: {
      label: "Amount",
      formatter: formatCurrency,
    },
    fundedDate: { label: "Funded Date", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: "none" },
    installmentAmt: { label: "Installment", formatter: formatCurrency },
    remainingBalance: { label: "Remaining Balance", formatter: formatCurrency },
  };

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchFundedLoans() {
      const requests = await BorrowcapApi.getFundedLoansByBorrowerId(
        currentUser.id
      );
      setFundedLoans(requests);
    }
    fetchFundedLoans();
  }, []);

  if (!fundedLoans.length) return <div></div>;

  return (
    <div>
      <p>Funded Loans</p>
      <TableComponent headers={headers} tableData={fundedLoans} />
    </div>
  );
};

export default FundedLoans;
