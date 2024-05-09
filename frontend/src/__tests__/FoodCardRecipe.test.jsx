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

/**
 *  Test case to ensure that the FoodCardRecipe component renders correctly with test data
 */
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
