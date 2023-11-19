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
import ApprovedRequests from "./ApprovedRequests.jsx";
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
          <ApprovedRequests />
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
        <ApprovedRequests />
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
        <ApprovedRequests />
      </UserContext.Provider>
    </BrowserRouter>
  );

  // Wait for api to resolve
  await waitFor(async () => {
    expect(BorrowcapApi.getApprovedRequests).toHaveBeenCalled();
  });

  // Verify approved request information is rendered properly
  expect(screen.getByText("App ID")).toBeInTheDocument();
  expect(screen.getByText("Borrower ID")).toBeInTheDocument();
  expect(screen.getByText("Requested Amount")).toBeInTheDocument();
  expect(screen.getByText("Approved Amount")).toBeInTheDocument();
  expect(screen.getByText("Purpose")).toBeInTheDocument();
  expect(screen.getByText("Approval Date")).toBeInTheDocument();
  expect(screen.getByText("Interest Rate")).toBeInTheDocument();
  expect(screen.getByText("Term")).toBeInTheDocument();
  expect(screen.getByText("Installment")).toBeInTheDocument();

  expect(screen.getByText("$10,000.00")).toBeInTheDocument();
  expect(screen.getByText("$9,000.00")).toBeInTheDocument();
  expect(screen.getByText("Car")).toBeInTheDocument();
  expect(screen.getByText("2023-01-05")).toBeInTheDocument();
  expect(screen.getByText("5.00%")).toBeInTheDocument();
  expect(screen.getByText("12")).toBeInTheDocument();
  expect(screen.getByText("$428.04")).toBeInTheDocument();
});
