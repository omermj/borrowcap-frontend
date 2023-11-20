import { render } from "@testing-library/react";
import NavRoutes from "./NavRoutes";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { commonBeforeEach } from "../underwriter/_testCommon";

// Mock api calls
vi.mock("../api/api");
beforeEach(commonBeforeEach);

// smoke test
it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: { username: "test", roles: ["admin"] } }}
      >
        <NavRoutes roles={["admin"]} purposes={"Home"} terms={"24"} />
      </UserContext.Provider>
    </BrowserRouter>
  );
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: { username: "test", roles: ["admin"] } }}
      >
        <NavRoutes roles={["admin"]} purposes={"Home"} terms={"24"} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
