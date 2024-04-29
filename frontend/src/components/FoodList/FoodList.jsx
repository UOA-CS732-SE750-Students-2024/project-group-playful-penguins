import React, { useContext } from "react";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../providers/AppContextProvider";


export function FoodList({foodData}) {
  const { isTakeout } = useContext(AppContext);
  const navigate = useNavigate();

  function navigateToRecipeInfo(){
    console.log("clicked a card")
    navigate('/recipe');


  }

  return (<div>
    {foodData && foodData.length > 0 ? (
      foodData.map((item, index) => (
        isTakeout ? (
          <FoodCardTakeout key={index} data={item} />
        ) : (
          <FoodCardRecipe key={index} data={item} />
        )
      ))
    ) : (
      <p>No data available.</p>  
    )}
  </div>
  );
}
