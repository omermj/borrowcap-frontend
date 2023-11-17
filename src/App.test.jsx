import { render } from "@testing-library/react";
import App from "./App";


it("renders without crashing", () => {
  render(<App />);
});

test("test", () => {
  expect(1).toBe(1);
});
