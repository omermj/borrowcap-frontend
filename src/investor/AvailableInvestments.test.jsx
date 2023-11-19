import { render, waitFor, screen } from "@testing-library/react";
import AvailableInvestments from "./AvailableInvestments.jsx";
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
      <AvailableInvestments />
    </UserContext.Provider>
  );
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <AvailableInvestments />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test table rendering
it("renders table with approved requests", async () => {
  render(
    <UserContext.Provider value={{ currentUser: testUser }}>
      <AvailableInvestments />
    </UserContext.Provider>
  );

  // Wait for api call to resolve and populate values
  await waitFor(() => {
    expect(BorrowcapApi.getAvailableInvestments).toHaveBeenCalled();
  });

  // Verify the table is populated
  expect(screen.getByText("Approved Amount")).toBeInTheDocument();
  expect(screen.getByText("Funded Amount")).toBeInTheDocument();
  expect(screen.getByText("Purpose")).toBeInTheDocument();
  expect(screen.getByText("Approved Date")).toBeInTheDocument();
  expect(screen.getByText("Funding Deadline")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();

  // Verify the table has correct data
  expect(screen.getByText("$8,000.00")).toBeInTheDocument();
  expect(screen.getByText("$0.00")).toBeInTheDocument();
  expect(screen.getByText("Medical")).toBeInTheDocument();
  expect(screen.getByText("2023-01-01")).toBeInTheDocument();
  expect(screen.getByText("2023-02-01")).toBeInTheDocument();
  expect(screen.getByText("7.00%")).toBeInTheDocument();
  expect(screen.getByText("24")).toBeInTheDocument();
});
