import { it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AppContextProvider } from "../providers/AppContextProvider";
import { HomePage } from "../pages/HomePage/HomePage";
import { MemoryRouter } from "react-router-dom";

/*
 *  Tests to  ensure elements of the homepage render correctly
 */
it("renders search bar and sort by", () => {
  const { getByLabelText, getByPlaceholderText } = render(
    <MemoryRouter>
      <AppContextProvider>
        <HomePage />
      </AppContextProvider>
    </MemoryRouter>
  );
  expect(getByLabelText("Sort By")).toBeDefined();
  expect(getByPlaceholderText("Search for recipes")).toBeDefined();
});

/**
 *  Checks loading message is displayed
 */
it("renders loading message", () => {
  const { getByText } = render(
    <MemoryRouter>
      <AppContextProvider>
        <HomePage />
      </AppContextProvider>
    </MemoryRouter>
  );

  expect(
    getByText("Hang in there while we grab that recipe for you!")
  ).toBeDefined();
});
