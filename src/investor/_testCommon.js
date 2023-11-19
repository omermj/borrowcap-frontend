import BorrowcapApi from "../api/api";

// Mock user
const testUser = {
  id: 1,
  username: "test",
  firstName: "test",
  lastName: "test",
  email: "testemail@email.com",
};

const commonBeforeEach = async () => {
  // Mock api calls
  await BorrowcapApi.getFundedLoansByUserId.mockResolvedValue({
    investor: [
      {
        id: 1,
        investorId: 3,
        amtInvested: "5000",
        amtFunded: "5000",
        fundedDate: "2023/01/01",
        interestRate: "0.05",
        term: 12,
        installmentAmt: "428.04",
        remainingBalance: "5000",
      },
    ],
  });
  await BorrowcapApi.getAvailableInvestments.mockResolvedValue([
    {
      id: 7,
      amtApproved: "8000",
      amtFunded: "0",
      purpose: "Medical",
      approvedDate: "2023/01/01",
      fundingDeadline: "2023/02/1",
      interestRate: "0.07",
      term: 24,
    },
  ]);
  await BorrowcapApi.getApprovedRequestsByUserId.mockResolvedValue({
    investor: [
      {
        id: 6,
        amtApproved: "25000",
        amtPledged: "5000",
        approvedDate: "2023/01/01",
        fundingDeadline: "2023/02/01",
        interestRate: "0.07",
        term: 36,
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
};

module.exports = { testUser, commonBeforeEach };
