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
};

module.exports = { testUser, commonBeforeEach };
