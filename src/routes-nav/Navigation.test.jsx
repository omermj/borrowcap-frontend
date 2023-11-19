import { render } from "@testing-library/react";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";

// smoke test
it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: { username: "test" } }}>
        <Navigation />
      </UserContext.Provider>
    </BrowserRouter>
  );
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: { username: "test" } }}>
        <Navigation />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
