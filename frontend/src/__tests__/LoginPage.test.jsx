import { it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoginPage from "../pages/LoginPage/LoginPage";

/*
 *   The login page component renders correctly
 */
it("renders LoginPage component correctly", () => {
  const { getByLabelText, getByRole, getByText } = render(<LoginPage />);

  expect(getByLabelText("Username")).toBeDefined();
  expect(getByLabelText("Password")).toBeDefined();
  expect(getByRole("button", { name: "Log in" })).toBeDefined();
  expect(
    getByText("Create an account to start off with your wellness journey!")
  ).toBeDefined();
  expect(getByRole("button", { name: "Sign Up" })).toBeDefined();
});

/*
 *   Check the login logic occurs (can also do for sign in page)            NEEDS TO BE ADDED

it("executes login logic when Log in button is clicked", () => {
  const { getByRole } = render(<LoginPage />);
  const loginButton = getByRole("button", { name: "Log in" });

  fireEvent.click(loginButton);
  // add login logic here
});
 */
