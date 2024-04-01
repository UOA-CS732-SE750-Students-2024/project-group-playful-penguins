import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { CalorieCountFilter } from "../CalorieCountFilter/CalorieCountFilter";
import { PrepTimeFilter } from "../PrepTimeFilter/PrepTimeFilter";
import { CookingTimeFilter } from "../CookingTimeFilter/CookingTimeFilter";
import { PriceFilter } from "../PriceFilter/PriceFilter";
import { DeliveryTimeFilter } from "../DeliveryTimeFilter/DeliveryTimeFilter";
import { DietRequirementFilter } from "../DietRequirementFilter/DietRequirementFilter";
export function FilterPanel() {
  const { isTakeout } = useContext(AppContext);

  return (
    <div>
      <CalorieCountFilter />
      {isTakeout ? (
        <div>
          <PriceFilter />
          <DeliveryTimeFilter />
        </div>
      ) : (
        <div>
          <PrepTimeFilter />
          <CookingTimeFilter />
        </div>
      )}
      <DietRequirementFilter />
      <div className="buttons_container">
        <button>Submit</button>
        <button>Reest</button>
      </div>
    </div>
  );
}
