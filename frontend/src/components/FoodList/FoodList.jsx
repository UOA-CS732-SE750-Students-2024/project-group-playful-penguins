import React, { useContext } from "react";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";

export function FoodList() {
  const { isTakeout } = useContext(AppContext);

  return (<div>
    {isTakeout ? (
      <FoodCardTakeout />
    ) : (<FoodCardRecipe />)}</div>
  );
}
