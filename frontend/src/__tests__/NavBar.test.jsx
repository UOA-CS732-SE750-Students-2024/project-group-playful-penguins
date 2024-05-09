import { it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import {
  AppContext,
  AppContextProvider,
} from "../providers/AppContextProvider";
import { Navbar } from "../components/Navbar/Navbar";
import { MemoryRouter } from "react-router-dom";

/*
 *  Check that the nav bar is rendered correctly
 */
it("renders nav bar", () => {
  const { getByRole, getByLabelText } = render(
    <MemoryRouter>
      <AppContextProvider>
        <Navbar />
      </AppContextProvider>
    </MemoryRouter>
  );

  expect(getByRole("button", { name: "Takeout" })).toBeDefined();
  expect(getByRole("button", { name: "Cook" })).toBeDefined();
  expect(getByLabelText("app-logo")).toBeDefined();
  expect(getByLabelText("profile-icon")).toBeDefined();
});

/*
 *  Check that that the category changes once clicked
 */
it("changes category on button click", async () => {
  const mockChangeCategory = vi.fn();

  const dummyContext = {
    isTakeout: true,
    changeCategory: mockChangeCategory,
    filters: [],
    selectedSortByOption: [],
  };

  const { getByText } = render(
    <MemoryRouter>
      <AppContext.Provider value={dummyContext}>
        <Navbar />
      </AppContext.Provider>
    </MemoryRouter>
  );

  const cookButton = await getByText("Cook");
  const takeoutButton = await getByText("Takeout");

  fireEvent.click(cookButton);
  expect(mockChangeCategory).toHaveBeenCalledWith(false);

  fireEvent.click(takeoutButton);
  expect(mockChangeCategory).toHaveBeenCalledWith(true);
});

/*
 * Check that clicking the logo in the nav bar takes you back to the home page
 * 3rd party testing 
it("nav bar logo button takes back to homepage", async () => {
  const { findByText, getByLabelText } = render(
    <MemoryRouter initialEntries={["/home"]}>
      <AppContextProvider value={dummyContext}>
        <App />
      </AppContextProvider>
    </MemoryRouter>
  );

  const appLogo = await getByLabelText("app-logo");
  expect(appLogo).toBeDefined();

  fireEvent.click(appLogo);

  const slogan = await findByText("PLAYFUL PENGUINS GOT YOU COVERED");

  expect(slogan).toBeDefined();
});
 */
