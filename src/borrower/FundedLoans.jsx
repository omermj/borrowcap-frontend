import { useState, useEffect, useContext } from "react";
import TableComponent from "../common/TableComponent";
import BorrowcapApi from "../api/api";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import UserContext from "../auth/UserContext";

/** Table showing all Fundend Loans for logged in user */

const FundedLoans = () => {
  const { currentUser } = useContext(UserContext);
  const [fundedLoans, setFundedLoans] = useState([]);

  const payIcon = () => {
    return <i className="bi-credit-card-fill"></i>;
  };

  // get funded loans on initial render
  useEffect(() => {
    async function fetchFundedLoans() {
      const fundedLoans = await BorrowcapApi.getFundedLoansByUserId(
        currentUser.id
      );
      if (fundedLoans) setFundedLoans(fundedLoans.borrower);
    }
    fetchFundedLoans();
  }, [currentUser.id]);

  const handlePay = async (id) => {
    await BorrowcapApi.payInstallment(id);
    const fundedLoans = await BorrowcapApi.getFundedLoansByUserId(
      currentUser.id
    );
    setFundedLoans([...fundedLoans.borrower]);
  };

  const headers = {
    id: { label: "ID", formatter: "none" },
    amtFunded: {
      label: "Amount",
      formatter: formatCurrency,
    },
    fundedDate: { label: "Funded Date", formatter: formatDate },
    interestRate: { label: "Interest Rate", formatter: formatPercent },
    term: { label: "Term", formatter: "none" },
    remainingBalance: { label: "Remaining Balance", formatter: formatCurrency },
    installmentAmt: { label: "Installment", formatter: formatCurrency },
    payBtn: {
      label: "Pay",
      formatter: "button",
      link: "/fundedloans/pay",
      onClick: handlePay,
      icon: payIcon,
      testId: "pay-button",
    },
  };

  if (!fundedLoans || !fundedLoans.length) return <div>No funded loans.</div>;

  return (
    <div className="border mb-4">
      <div className="py-2">
        <span className="align-middle h5">Funded Loans</span>
      </div>
      <TableComponent headers={headers} tableData={fundedLoans} />
    </div>
  );
};

export default FundedLoans;
