import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

// smoke test
it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
