import React from "react";
import { it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { FoodCardRecipe } from "../components/FoodCardRecipe/FoodCardRecipe";
import { MemoryRouter } from "react-router-dom";
import { AppContextProvider } from "../providers/AppContextProvider";

const testData = {
  id: 123,
  title: "Burrito bowl with chipotle black beans",
  image: "https://example.com/images/bowl.png",
  readyInMinutes: 35,
  servings: 2,
};

it("food card recipe renders correctly with test data", () => {
  const { getByText } = render(
    <MemoryRouter>
      <AppContextProvider>
        <FoodCardRecipe data={testData} />
      </AppContextProvider>
    </MemoryRouter>
  );

  expect(getByText(testData.title)).toBeDefined();
  expect(getByText(`${testData.readyInMinutes} mins`)).toBeDefined();
  expect(getByText(`Serves ${testData.servings}`)).toBeDefined();
});

/*
it("calls navigate function on click", () => {
  const navigateMock = vi.fn();

  const testData = {
    id: 123,
    title: "Burrito bowl with chipotle black beans",
    image: "https://example.com/images/bowl.png",
    readyInMinutes: 35,
    servings: 2,
  };

  const { getByAltText } = render(
    <MemoryRouter>
      <AppContextProvider>
        <FoodCardRecipe data={testData} />
      </AppContextProvider>
    </MemoryRouter>,
    {
      navigate: navigateMock,
    }
  );

  fireEvent.click(getByAltText(testData.title));

  expect(navigateMock).toHaveBeenCalledWith(`recipe/${testData.id}`);
});
*/
