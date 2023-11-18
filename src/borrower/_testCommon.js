import BorrowcapApi from "../api/api";

// Mock user
const testUser = {
  id: 1,
  username: "test",
  firstName: "test",
  lastName: "test",
  email: "testemail@email.com",
};

const commonBeforeEach = () => {
  // Mock api call with active requests
  BorrowcapApi.getActiveRequestsByBorrowerId.mockResolvedValue([
    {
      id: 4,
      amtRequested: 10000,
      purpose: "Business",
      appOpenDate: "2021/01/01",
      interestRate: 0.05,
      term: 12,
      installmentAmt: 1000,
    },
    {
      id: 5,
      amtRequested: 20000,
      purpose: "Home",
      appOpenDate: "2021/02/01",
      interestRate: 0.07,
      term: 24,
      installmentAmt: 2000,
    },
  ]);

  BorrowcapApi.getApprovedRequestsByUserId.mockResolvedValue({
    borrower: [
      {
        id: 2,
        amtRequested: "13000",
        amtApproved: "12000",
        amtFunded: "6000",
        purpose: "Education",
        appOpenDate: "2023-01-01",
        appApprovedDate: "2023/01/05",
        fundingDeadline: "2023/02/05",
        interestRate: "0.07",
        term: 24,
        installmentAmt: "537.27",
        availableForFunding: false,
      },
    ],
  });

  BorrowcapApi.getApprovedRequest.mockResolvedValue({
    id: 8,
    borrowerId: 2,
    amtRequested: "13000",
    amtApproved: "12000",
    amtFunded: "6000",
    purpose: "Education",
    purposeId: 3,
    appOpenDate: "2023-01-01",
    appApprovedDate: "2023/01/05",
    fundingDeadline: "2023/02/05",
    interestRate: "0.07",
    term: 24,
    installmentAmt: "537.27",
    availableForFunding: true,
    isFunded: false,
    annualIncome: "100000",
    otherMonthlyDebt: "1200",
  });

  BorrowcapApi.enableFundingForApprovedRequest.mockResolvedValue({
    message: "Funding is enabled",
  });

  BorrowcapApi.getFundedLoansByUserId.mockResolvedValue({
    borrower: [
      {
        id: 6,
        amtFunded: "25000",
        fundedDate: "2023/01/05",
        interestRate: "0.07",
        term: 36,
        installmentAmt: "771.93",
        remainingBalance: "25000",
      },
    ],
  });
};

module.exports = { testUser, commonBeforeEach };
