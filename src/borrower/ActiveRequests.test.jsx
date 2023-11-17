import { render, waitFor, screen } from "@testing-library/react";
import ActiveRequests from "./ActiveRequests";
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
      <ActiveRequests />
    </UserContext.Provider>
  );
});

// Test table rendering
it("renders table with loan requests", async () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ActiveRequests />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and ppulate table
  await waitFor(() => {
    expect(BorrowcapApi.getLoanRequestsByBorrowerId).toHaveBeenCalledWith(
      testUser.id
    );
  });

  // Verify that the table is populated
  expect(screen.getByText("New Loan Requests")).toBeInTheDocument();
  expect(screen.getByText("Requested Amount")).toBeInTheDocument();
  expect(screen.getByText("Purpose")).toBeInTheDocument();
  expect(screen.getByText("Application Date")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();
  expect(screen.getByText("Installment")).toBeInTheDocument();

  // Verify that the table has the correct data
  expect(screen.getByText("$10,000.00")).toBeInTheDocument();
  expect(screen.getByText("Business")).toBeInTheDocument();
  expect(screen.getByText("2021-01-01")).toBeInTheDocument();
  expect(screen.getByText("5.00%")).toBeInTheDocument();
  expect(screen.getByText("12")).toBeInTheDocument();
  expect(screen.getByText("$1,000.00")).toBeInTheDocument();
});

// Test table rendering with no loan requests
it("renders table with no loan requests", async () => {
  // Mock api call to return empty array
  BorrowcapApi.getLoanRequestsByBorrowerId.mockResolvedValue([]);

  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ActiveRequests />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and ppulate table
  await waitFor(() => {
    expect(BorrowcapApi.getLoanRequestsByBorrowerId).toHaveBeenCalledWith(
      testUser.id
    );
  });

  expect(screen.getByText("No active loan requests.")).toBeInTheDocument();
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ActiveRequests />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
