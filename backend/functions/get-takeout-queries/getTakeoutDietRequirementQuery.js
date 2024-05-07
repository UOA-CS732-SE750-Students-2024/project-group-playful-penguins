export const getTakeoutDietRequirementQuery = (selectedRequirement) => {
  if (selectedRequirement) {
    return {
      dietary_requirement: {
        $regex: selectedRequirement,
        $options: "i",
      },
    };
  }
};
