import { render, act } from "@testing-library/react";
import UserContext from "../auth/UserContext.jsx";
import { testUser } from "./_testCommon.js";
import { expect, it } from "vitest";
import BorrowerMain from "./BorrowerMain.jsx";
import { BrowserRouter } from "react-router-dom";

// Smoke test
it("renders without crashing", () => {
  act(() => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser: testUser }}>
          <BorrowerMain />
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
        <BorrowerMain />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});
