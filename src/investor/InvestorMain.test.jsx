import { render, act } from "@testing-library/react";
import UserContext from "../auth/UserContext.jsx";
import { testUser } from "./_testCommon.js";
import { expect, it } from "vitest";
import InvestorMain from "./InvestorMain.jsx";
import { BrowserRouter } from "react-router-dom";

// Smoke test
it("renders without crashing", () => {
  act(() => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser: testUser }}>
          <InvestorMain />
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
        <InvestorMain />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});
