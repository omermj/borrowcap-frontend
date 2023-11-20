import { render, act } from "@testing-library/react";
import UserContext from "../auth/UserContext.jsx";
import { commonBeforeEach, testUser } from "./_testCommon.js";
import { expect, it } from "vitest";
import UnderwriterMain from "./UnderwriterMain.jsx";
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
          <UnderwriterMain />
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
        <UnderwriterMain />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});
