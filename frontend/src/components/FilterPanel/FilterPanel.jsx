import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { CalorieCountFilter } from "../Filters/CalorieCountFilter/CalorieCountFilter";
import { PrepTimeFilter } from "../Filters/PrepTimeFilter/PrepTimeFilter";
import { DietRequirementFilter } from "../Filters/DietRequirementFilter/DietRequirementFilter";
import { CookingTimeFilter } from "../Filters/CookingTimeFilter/CookingTimeFilter";
import { DeliveryTimeFilter } from "../Filters/DeliveryTimeFilter/DeliveryTimeFilter";
import { PriceFilter } from "../Filters/PriceFilter/PriceFilter";

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
      <div>
        <button>Apply</button>
        <button>Reset</button>
      </div>
    </div>
  );
}
