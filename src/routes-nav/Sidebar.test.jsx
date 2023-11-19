import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";

// smoke test
it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: { username: "test", roles: ["borrower"] } }}
      >
        <Sidebar />
      </UserContext.Provider>
    </BrowserRouter>
  );
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: { username: "test", roles: ["borrower"] } }}
      >
        <Sidebar />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
