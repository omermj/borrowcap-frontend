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
import ApprovalRequests from "./ApprovalRequests.jsx";
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
          <ApprovalRequests />
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
        <ApprovalRequests />
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
        <ApprovalRequests />
      </UserContext.Provider>
    </BrowserRouter>
  );

  // Wait for api to resolve
  await waitFor(async () => {
    expect(BorrowcapApi.getLoanRequests).toHaveBeenCalled();
  });

  // Verify approved request information is rendered properly
  expect(screen.getByText("App ID")).toBeInTheDocument();
  expect(screen.getByText("Borrower ID")).toBeInTheDocument();
  expect(screen.getByText("Requested Amount")).toBeInTheDocument();
  expect(screen.getByText("Purpose")).toBeInTheDocument();
  expect(screen.getByText("Application Date")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();
  expect(screen.getByText("Installment")).toBeInTheDocument();

  expect(screen.getByText("$10,000.00")).toBeInTheDocument();
  expect(screen.getByText("Education")).toBeInTheDocument();
  expect(screen.getByText("2023-01-01")).toBeInTheDocument();
  expect(screen.getByText("7.00%")).toBeInTheDocument();
  expect(screen.getByText("36")).toBeInTheDocument();
  expect(screen.getByText("$319.86")).toBeInTheDocument();
});
