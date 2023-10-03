import { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import BorrowcapApi from "../api/api";

const FundedLoans = () => {
  const [fundedLoans, setFundedLoans] = useState([]);

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchFundedLoans() {
      const requests = await BorrowcapApi.getFundedLoans();
      setFundedLoans(requests);
    }
    fetchFundedLoans();
  }, []);

  if (!fundedLoans.length) return <div></div>;

  return (
    <div>
      <p>Funded Loans</p>
      <TableComponent tableData={fundedLoans} />
    </div>
  );
};

export default FundedLoans;
