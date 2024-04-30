export const getDietRequirement = (req) => {
  let query = {};

  if (req.query.dietRequirement) {
    query[req.query.dietRequirement] = true;
  }

  return query;
};
