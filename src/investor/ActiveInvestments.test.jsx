import { render, waitFor, screen } from "@testing-library/react";
import ActiveInvestments from "./ActiveInvestments.jsx";
import { expect, it } from "vitest";
import UserContext from "../auth/UserContext.jsx";
import { commonBeforeEach, testUser } from "./_testCommon.js";
import BorrowcapApi from "../api/api.js";

// Mock api calls
vi.mock("../api/api");
beforeEach(commonBeforeEach);

// Smoke test
it("renders without crashing", () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ActiveInvestments />
    </UserContext.Provider>
  );
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ActiveInvestments />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test table rendering
it("renders table with approved requests", async () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ActiveInvestments />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and populate values
  await waitFor(() => {
    expect(BorrowcapApi.getFundedLoansByUserId).toHaveBeenCalledWith(
      testUser.id
    );
  });

  // Verify the table is populated
  expect(screen.getByText("Invested Amount")).toBeInTheDocument();
  expect(screen.getByText("Loan Amount")).toBeInTheDocument();
  expect(screen.getByText("Funded Date")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();
  expect(screen.getByText("Installment Amount")).toBeInTheDocument();
  expect(screen.getByText("Remaining Balance")).toBeInTheDocument();

  // Verify the table has correct data
  expect(screen.getByText("2023-01-01")).toBeInTheDocument();
  expect(screen.getByText("5.00%")).toBeInTheDocument();
  expect(screen.getByText("12")).toBeInTheDocument();
  expect(screen.getByText("$428.04")).toBeInTheDocument();
});
