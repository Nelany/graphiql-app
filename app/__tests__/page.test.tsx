import { render, screen } from "@testing-library/react";
import Page from "../page";

test("renders welcome message", () => {
  render(<Page />);
  expect(
    screen.getByText("Welcome to the REST/GraphiQL client!")
  ).toBeInTheDocument();
});
