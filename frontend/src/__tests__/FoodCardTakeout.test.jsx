import React from "react";
import { it, expect } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { FoodCardTakeout } from "../components/FoodCardTakeout/FoodCardTakeout";
import { MemoryRouter } from "react-router-dom";
import { AppContextProvider } from "../providers/AppContextProvider";

const testData = {
  dish_name: "Delicious Dish",
  dish_image_url: "https://example.com/dish-image.jpg",
  price: "10.99",
  restaurant_name: "Best Restaurant",
};
/**
 *  Test case to ensure that the FoodCardTakeout component renders correctly with test data
 */
it("food card takeout renders correctly with test data", () => {
  const { getByText } = render(
    <MemoryRouter>
      <AppContextProvider>
        <FoodCardTakeout data={testData} />
      </AppContextProvider>
    </MemoryRouter>
  );

  expect(getByText(testData.dish_name)).toBeDefined();
});

/**
 * Test case to ensure that the modal opens when the card image is clicked
 */
it("opens modal when clicked", () => {
  const { getByRole } = render(
    <MemoryRouter>
      <AppContextProvider>
        <FoodCardTakeout data={testData} />
      </AppContextProvider>
    </MemoryRouter>
  );
  const card = getByRole("img", { name: testData.dish_name });

  fireEvent.click(card);

  const modalElement = getByRole("button", { name: /Order/i });
  expect(modalElement).toBeInTheDocument();
});

/**
 * Test case to ensure that the modal closes when the close button is clicked
 */
it("closes modal when close button is clicked", async () => {
  const { getByRole, getByLabelText, queryByRole } = render(
    <MemoryRouter>
      <AppContextProvider>
        <FoodCardTakeout data={testData} />
      </AppContextProvider>
    </MemoryRouter>
  );
  const card = getByRole("img", { name: testData.dish_name });

  fireEvent.click(card);

  const closeButton = getByLabelText("CloseIcon");
  fireEvent.click(closeButton);

  expect(queryByRole("button", { name: /Order/i })).not.toBeInTheDocument();
});
