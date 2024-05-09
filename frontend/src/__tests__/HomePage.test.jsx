import { it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import {
  AppContext,
  AppContextProvider,
} from "../providers/AppContextProvider";
import { HomePage } from "../pages/HomePage/HomePage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const dummyContext = {
  isTakeout: false,
  filters: {
    calorieCountValues: [20, 30],
    prepTimeValues: [20, 30],
    cookingTimeValues: [20, 30],
    priceValues: [20, 30],
    deliveryTimeValues: [20, 30],
    selectedRequirement: [20, 30],
  },
  selectedSortByOption: [],
};

const testData = {
  id: 123,
  title: "Burrito bowl with chipotle black beans",
  image: "https://example.com/images/bowl.png",
  readyInMinutes: 35,
  servings: 2,
};

const axiosMock = new MockAdapter(axios);

axiosMock.onGet("${import.meta.env.VITE_BACKEND_URL}/recipes?").reply(200, [
  {
    testData,
  },
]);

/*
 *  Tests to  ensure elements of the homepage render correctly
 */

it("renders search bar and sort by", () => {
  const { getByLabelText, getByPlaceholderText } = render(
    <AppContextProvider>
      <HomePage />
    </AppContextProvider>
  );
  expect(getByLabelText("Sort By")).toBeDefined();
  expect(getByPlaceholderText("Search for recipes")).toBeDefined();
});

/**
 *  Checks loading message is displayed\
 */
it("renders loading message", () => {
  const { getByText } = render(
    <AppContext.Provider value={dummyContext}>
      <HomePage />
    </AppContext.Provider>
  );

  expect(
    getByText("Hang in there while we grab that recipe for you!")
  ).toBeDefined();
});

/**
 *  Checks loading message is displayed and recipes are displayed             NOT WORKING

it("renders loading message and recipes are then displayed", async () => {
  const { getByText, getByAltText, queryByText } = render(
    <AppContext.Provider value={dummyContext}>
      <HomePage />
    </AppContext.Provider>
  );

  expect(
    getByText("Hang in there while we grab that recipe for you!")
  ).toBeDefined();

  await waitFor(() => {
    expect(
      queryByText("Hang in there while we grab that recipe for you!")
    ).not.toBeInTheDocument();
  });

  expect(await getByAltText(testData.title)).toBeInTheDocument();
});
 */
