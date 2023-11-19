import { render, waitFor, screen, act } from "@testing-library/react";
import AvailableInvestment from "./AvailableInvestment.jsx";
import { expect, it } from "vitest";
import UserContext from "../auth/UserContext.jsx";
import { commonBeforeEach, testUser } from "./_testCommon.js";
import BorrowcapApi from "../api/api.js";
import { BrowserRouter } from "react-router-dom";

// Mock api calls
vi.mock("../api/api");
beforeEach(commonBeforeEach);

// Smoke test
it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: testUser }}>
        <AvailableInvestment />
      </UserContext.Provider>
    </BrowserRouter>
  );
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: testUser }}>
        <AvailableInvestment />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test Available Investment data
it("renders information properly", async () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: testUser }}>
        <AvailableInvestment />
      </UserContext.Provider>
    </BrowserRouter>
  );

  // Wait for api to resolve
  await waitFor(async () => {
    expect(BorrowcapApi.getApprovedRequest).toHaveBeenCalled();
  });

  // Verify approved request information is rendered properly
  expect(screen.getByText("Amount Requested: $13,000.00")).toBeInTheDocument();
  expect(screen.getByText("Amount Approved: $12,000.00")).toBeInTheDocument();
  expect(screen.getByText("Amount Funded: $6,000.00")).toBeInTheDocument();
  expect(screen.getByText("Loan Purpose: Education")).toBeInTheDocument();

  // Verify buttons rendered properly
  expect(screen.getByText("Invest")).toBeInTheDocument();
});

// Test Invest button click
it("handles Enable Funding button click", async () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: testUser }}>
        <AvailableInvestment />
      </UserContext.Provider>
    </BrowserRouter>
  );

  // Wait for api to resolve
  await waitFor(() => {
    expect(BorrowcapApi.getApprovedRequest).toHaveBeenCalled();
  });

  // Click enable funding button
  async () => {
    const investButton = screen.getByText("Invest");
    fireEvent.click(investButton);

    await waitFor(() => {
      expect(BorrowcapApi.fundApprovedRequest).toHaveBeenCalled();
    });
  };
});
