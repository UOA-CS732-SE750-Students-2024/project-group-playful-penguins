import React, { useContext } from "react";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";
import { useEffect, useState } from "react";
import TakeoutService from "../../services/TakeoutService";

export function FoodList({ foodData }) {
  const {
    isTakeout,
    takeouts,
    setTakeouts,
    searchTerm,
    selectedSortByOption,
    calorieCountValuesFilter,
    priceValuesFilter,
    deliveryTimeValuesFilter,
    selectedRequirement,
  } = useContext(AppContext);

  const [filteredTakeouts, setFilteredTakeouts] = useState([]);

  const fetchTakeoutData = async (queryParams) => {
    try {
      const data = await TakeoutService.getTakeouts(queryParams);
      setTakeouts(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTakeoutData({});
  }, []);

  // useEffect(() => {
  //   fetchTakeoutData(searchTerm);
  // }, [searchTerm]);

  useEffect(() => {
    const sortDirection = selectedSortByOption;
    const copyArray = [...takeouts]; // create a new array & not mutate state
    copyArray.sort((a, b) => {
      return sortDirection === "Name(A-Z)"
        ? a.dish_name.localeCompare(b.dish_name)
        : b.dish_name.localeCompare(a.dish_name);
    });
    setTakeouts(copyArray);
  }, [selectedSortByOption]);

  useEffect(() => {
    const queryParams = {
      dish_name: searchTerm,
      dietary_requirement: selectedRequirement,
      minPrice: priceValuesFilter[0],
      maxPrice: priceValuesFilter[1],
      minCalorie: calorieCountValuesFilter[0],
      maxCalorie: calorieCountValuesFilter[1],
      minDeliveryTime: deliveryTimeValuesFilter[0],
      maxDeliveryTime: deliveryTimeValuesFilter[1],
    };
    fetchTakeoutData(queryParams);
  }, [
    searchTerm,
    calorieCountValuesFilter,
    priceValuesFilter,
    deliveryTimeValuesFilter,
    selectedRequirement,
  ]);

  return (
    <div>
      {isTakeout ? (
        takeouts && takeouts.length > 0 ? (
          takeouts?.map((item, index) => (
            <FoodCardTakeout key={index} data={item} />
          ))
        ) : (
          <p>No search result</p>
        )
      ) : (
        <p>to do Receipe data</p>
      )}
    </div>
  );
}
