import { useState, useEffect } from "react";
import TableComponent from "./TableComponent";
import BorrowcapApi from "../api/api";

const ActiveRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);

  // get active loan requests on initial render
  useEffect(() => {
    async function fetchLoanRequests() {
      const requests = await BorrowcapApi.getLoanRequests();
      setLoanRequests(requests);
    }
    fetchLoanRequests();
  }, []);

  if (!loanRequests.length) return <div></div>;

  return (
    <div>
      <p>Loan Requests</p>
      <TableComponent tableData={loanRequests} />
    </div>
  );
};

export default ActiveRequests;
