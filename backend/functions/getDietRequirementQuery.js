export const getDietRequirementQuery = (selectedRequirement) => {
  if (selectedRequirement) {
    const query = {
      diets: {
        $regex: selectedRequirement,
        $options: "i",
      },
    };
    return query;
  }
};
