export const getRecipeDietRequirementQuery = (selectedRequirement) => {
  if (selectedRequirement) {
    return {
      diets: {
        $regex: selectedRequirement,
        $options: "i",
      },
    };
  }
};
