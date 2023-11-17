import { render, waitFor, screen } from "@testing-library/react";
import ApprovedRequests from "./ApprovedRequests.jsx";
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
      <ApprovedRequests />
    </UserContext.Provider>
  );
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ApprovedRequests />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test table rendering
it("renders table with approved requests", async () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <ApprovedRequests />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and populate values
  await waitFor(() => {
    expect(BorrowcapApi.getApprovedRequestsByUserId).toHaveBeenCalledWith(
      testUser.id
    );
  });

  // Verify the table is populated
  expect(screen.getByText("Requested Amount")).toBeInTheDocument();
  expect(screen.getByText("Approved Amount")).toBeInTheDocument();
  expect(screen.getByText("Funded Amount")).toBeInTheDocument();
  expect(screen.getByText("Purpose")).toBeInTheDocument();
  expect(screen.getByText("Approval Date")).toBeInTheDocument();
  expect(screen.getByText("Funding Deadline")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();
  expect(screen.getByText("Installment")).toBeInTheDocument();
  expect(screen.getByText("Funding Active")).toBeInTheDocument();

  // Verify the table has correct data
  expect(screen.getByText("$13,000.00")).toBeInTheDocument();
  expect(screen.getByText("$12,000.00")).toBeInTheDocument();
  expect(screen.getByText("$6,000.00")).toBeInTheDocument();
  expect(screen.getByText("Education")).toBeInTheDocument();
  expect(screen.getByText("2023-01-05")).toBeInTheDocument();
  expect(screen.getByText("2023-02-05")).toBeInTheDocument();
  expect(screen.getByText("7.00%")).toBeInTheDocument();
  expect(screen.getByText("24")).toBeInTheDocument();
  expect(screen.getByText("$537.27")).toBeInTheDocument();
  expect(screen.getByText("No")).toBeInTheDocument();
});
