import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import FundedLoans from "./FundedLoans.jsx";
import { expect, it } from "vitest";
import UserContext from "../auth/UserContext";
import { commonBeforeEach, testUser } from "./_testCommon.js";
import BorrowcapApi from "../api/api.js";

// Mock api calls
vi.mock("../api/api");
beforeEach(commonBeforeEach);

// Smoke test
it("renders without crashing", () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <FundedLoans />
    </UserContext.Provider>
  );
});

// Snapshot test
it("matches the snapshot", () => {
  const { asFragment } = render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <FundedLoans />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test table rendering
it("renders table with funded loans", async () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <FundedLoans />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and populate values
  await waitFor(async () => {
    expect(BorrowcapApi.getFundedLoansByUserId).toHaveBeenCalledWith(
      testUser.id
    );
  });

  // Verify table is populated
  expect(screen.getByText("Amount")).toBeInTheDocument();
  expect(screen.getByText("Funded Date")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();
  expect(screen.getByText("Remaining Balance")).toBeInTheDocument();
  expect(screen.getByText("Installment")).toBeInTheDocument();
  expect(screen.getByText("Pay")).toBeInTheDocument();

  // Verify table has correct data
  expect((await screen.findAllByText("$25,000.00")).length).toEqual(2);
  expect(screen.getByText("2023-01-05")).toBeInTheDocument();
  expect(screen.getByText("7.00%")).toBeInTheDocument();
  expect(screen.getByText("36")).toBeInTheDocument();
  expect(screen.getByText("$771.93")).toBeInTheDocument();
});

// Test Fund button
it("handles Fund button click", async () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <FundedLoans />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and populate values
  await waitFor(async () => {
    expect(BorrowcapApi.getFundedLoansByUserId).toHaveBeenCalledWith(
      testUser.id
    );
  });

  // Click Fund button
  async () => {
    const fundButton = screen.getByTestId("pay-button");
    fireEvent.click(fundButton);

    await waitFor(() => {
      expect(BorrowcapApi.payInstallment).toHaveBeenCalled();
      expect(BorrowcapApi.getFundedLoansByUserId).toHaveBeenCalled();
    });
  };
});
