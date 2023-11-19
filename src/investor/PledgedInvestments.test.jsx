import { render, waitFor, screen, act } from "@testing-library/react";
import PledgedInvestments from "./PledgedInvestments.jsx";
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
      <PledgedInvestments />
    </UserContext.Provider>
  );
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <PledgedInvestments />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test table rendering
it("renders table with approved requests", async () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <PledgedInvestments />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and populate values
  await waitFor(() => {
    expect(BorrowcapApi.getApprovedRequestsByUserId).toHaveBeenCalledWith(
      testUser.id
    );
  });

  // Verify the table is populated
  expect(screen.getByText("Approved Amount")).toBeInTheDocument();
  expect(screen.getByText("Pledged Amount")).toBeInTheDocument();
  expect(screen.getByText("Approved Date")).toBeInTheDocument();
  expect(screen.getByText("Funding Deadline")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();

  // Verify the table has correct data
  expect(screen.getByText("$25,000.00")).toBeInTheDocument();
  expect(screen.getByText("$5,000.00")).toBeInTheDocument();
  expect(screen.getByText("2023-01-01")).toBeInTheDocument();
  expect(screen.getByText("2023-02-01")).toBeInTheDocument();
  expect(screen.getByText("7.00%")).toBeInTheDocument();
  expect(screen.getByText("36")).toBeInTheDocument();
});
