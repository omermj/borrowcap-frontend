import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import UserContext from "../auth/UserContext.jsx";
import { commonBeforeEach, testUser } from "./_testCommon.js";
import BorrowcapApi from "../api/api.js";
import { expect, it } from "vitest";
import ApprovedRequest from "./ApprovedRequest.jsx";
import { BrowserRouter } from "react-router-dom";

// Mock api calls
vi.mock("../api/api");
beforeEach(() => commonBeforeEach);

// Smoke test
it("renders without crashing", () => {
  act(() => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser: testUser }}>
          <ApprovedRequest />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });
});

// Snapshot test
it("matches the snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: testUser }}>
        <ApprovedRequest />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});

// Test Approved Request data
it("renders information properly", async () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: testUser }}>
        <ApprovedRequest />
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
  expect(screen.getByText("Enable Funding")).toBeInTheDocument();
  expect(screen.getByText("Cancel Request")).toBeInTheDocument();
});

// Test Enable Funding button click
it("handles Enable Funding button click", async () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: testUser }}>
        <ApprovedRequest />
      </UserContext.Provider>
    </BrowserRouter>
  );

  // Wait for api to resolve
  await waitFor(() => {
    expect(BorrowcapApi.getApprovedRequest).toHaveBeenCalled();
  });

  // Click enable funding button
  async () => {
    const enableFundingButton = screen.getByText("Enable Funding");
    fireEvent.click(enableFundingButton);

    await waitFor(() => {
      expect(BorrowcapApi.enableFundingForApprovedRequest).toHaveBeenCalled();
    });
  };
  expect(screen.getByText("Funding Enabled: Yes")).toBeInTheDocument();
});
