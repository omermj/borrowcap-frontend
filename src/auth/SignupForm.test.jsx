import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <SignupForm roles={["investor", "borrower"]} />
    </BrowserRouter>
  );
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <SignupForm roles={["investor", "borrower"]} />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
