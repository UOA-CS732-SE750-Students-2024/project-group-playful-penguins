import { it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AppContextProvider } from "../providers/AppContextProvider";

const dummyContext = {
  isTakeout: [],
  filters: [],
  selectedSortByOption: [],
};

/*
 * Ensures landing page is rendered correctly
 */
it("Renders the landing page correctly", () => {
  const { queryByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <AppContextProvider value={dummyContext}>
        <App />
      </AppContextProvider>
    </MemoryRouter>
  );

  expect(queryByText("PLAYFUL PENGUINS GOT YOU COVERED")).toBeDefined();
});

/*
 * Ensures home page is rendered correctly
 */
it("Renders the home page correctly", () => {
  const { queryByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <AppContextProvider value={dummyContext}>
        <App />
      </AppContextProvider>
    </MemoryRouter>
  );

  expect(queryByText("PLAYFUL PENGUINS GOT YOU COVERED")).toBeDefined();
});
