import { render } from "@testing-library/react";
import TableComponent from "./TableComponent";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";

// smoke test
it("renders without crashing", () => {
  const headers = {
    id: { label: "ID", formatter: "none" },
    amount: { label: "Amount", formatter: "none" },
  };
  const data = [1, 10000];

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: { username: "test" } }}>
        <TableComponent headers={headers} tableData={data} />
      </UserContext.Provider>
    </BrowserRouter>
  );
});

// snapshot test
it("matches snapshot", () => {
  const headers = {
    id: { label: "ID", formatter: "none" },
    amount: { label: "Amount", formatter: "none" },
  };
  const data = [1, 10000];
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser: { username: "test" } }}>
        <TableComponent headers={headers} tableData={data} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
