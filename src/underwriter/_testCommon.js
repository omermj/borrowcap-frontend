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
  await BorrowcapApi.getLoanRequests.mockResolvedValue([
    {
      id: 2,
      borrowerId: 2,
      amtRequested: "10000",
      purpose: "Education",
      purposeId: 3,
      appOpenDate: "2023/01/01",
      interestRate: "0.07",
      term: 36,
      installmentAmt: "319.86",
    },
  ]);

  await BorrowcapApi.getApprovedRequests.mockResolvedValue([
    {
      id: 1,
      borrowerId: 2,
      amtRequested: "10000",
      amtApproved: "9000",
      amtFunded: "5000",
      purpose: "Car",
      purposeId: 2,
      appOpenDate: "2023/01/01",
      appApprovedDate: "2023/01/05",
      fundingDeadline: "2023/02/05",
      interestRate: "0.05",
      term: 12,
      installmentAmt: "428.04",
      availableForFunding: false,
      isFunded: true,
    },
  ]);
};

module.exports = { testUser, commonBeforeEach };
