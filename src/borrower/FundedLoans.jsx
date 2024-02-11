import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import { toast } from "react-toastify";
import TableHeader from "../common/Table/TableHeader";
import TableButton from "../common/Table/TableButton";
import BorrowcapApi from "../api/api";
import MUITable from "../common/Table/MUITable";
import { updateStatistics } from "../features/user/userSlice";

const payIcon = () => {
  return <i className="bi-credit-card-fill"></i>;
};

/** Table showing all Fundend Loans for logged in user */

const FundedLoans = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.user);
  const [fundedLoans, setFundedLoans] = useState([]);

  const notifyPayInstallment = () =>
    toast.success("Installment has been paid successfully.");

  // get funded loans on initial render
  useEffect(() => {
    async function fetchFundedLoans() {
      BorrowcapApi.token = currentUser.token;
      const fundedLoans = await BorrowcapApi.getFundedLoansByUserId(
        currentUser.id
      );
      if (fundedLoans) setFundedLoans(fundedLoans.borrower);
    }
    fetchFundedLoans();
  }, [currentUser.id, currentUser.token]);

  const handlePay = async (id) => {
    // e.preventDefault();
    BorrowcapApi.token = currentUser.token;
    await BorrowcapApi.payInstallment(id);
    const fundedLoans = await BorrowcapApi.getFundedLoansByUserId(
      currentUser.id
    );
    const updatedUser = await BorrowcapApi.getCurrentUser(currentUser.username);
    setFundedLoans([...fundedLoans.borrower]);
    dispatch(updateStatistics({ user: updatedUser }));
    notifyPayInstallment();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      minWidth: 50,
    },
    {
      field: "amtFunded",
      headerName: "Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
      minWidth: 150,
    },
    {
      field: "fundedDate",
      headerName: "Funded Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatDate(value),
      minWidth: 150,
    },
    {
      field: "interestRate",
      headerName: "Interest Rate",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatPercent(value),
      minWidth: 150,
    },
    {
      field: "term",
      headerName: "Term",
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      minWidth: 50,
    },
    {
      field: "remainingBalance",
      headerName: "Remaining Balance",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
      minWidth: 150,
    },
    {
      field: "installmentAmt",
      headerName: "Installment",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
      minWidth: 150,
    },
    {
      field: "pay",
      headerName: "Pay",
      flex: 0.75,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <TableButton
            icon={payIcon}
            link={`/fundedloans/pay/${params.id}`}
            onClick={() => handlePay(params.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="mb-4">
      <TableHeader text={"Funded Loans"} />
      {!fundedLoans || !fundedLoans.length ? (
        <div className=" mb-2 fst-italic fw-light">
          {" "}
          <small>No funded loans.</small>
        </div>
      ) : (
        // <TableComponent headers={headers} tableData={fundedLoans} />
        <MUITable headers={columns} tableData={fundedLoans} />
      )}
    </div>
  );
};

export default FundedLoans;
