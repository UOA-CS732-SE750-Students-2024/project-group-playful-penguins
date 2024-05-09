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
it("Renders the landing page correctly", async () => {
  const { findByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <AppContextProvider value={dummyContext}>
        <App />
      </AppContextProvider>
    </MemoryRouter>
  );

  const slogan = await findByText("PLAYFUL PENGUINS GOT YOU COVERED");

  expect(slogan).toBeDefined();
});

/*
 * Ensures home page is rendered correctly
 */
it("Renders the home page correctly", async () => {
  const { getByLabelText, findByText, getByPlaceholderText } = render(
    <MemoryRouter initialEntries={["/home"]}>
      <AppContextProvider value={dummyContext}>
        <App />
      </AppContextProvider>
    </MemoryRouter>
  );

  const sortBy = await getByLabelText("Sort By");
  const searchBar = await getByPlaceholderText("Search for recipes");
  const dietReq = await findByText("Diet Requirement");

  expect(sortBy).toBeDefined();
  expect(searchBar).toBeDefined();
  expect(dietReq).toBeDefined();
});
