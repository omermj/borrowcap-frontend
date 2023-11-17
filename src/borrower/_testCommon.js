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
  BorrowcapApi.getLoanRequestsByBorrowerId.mockResolvedValue([
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
};

module.exports = { testUser, commonBeforeEach };
