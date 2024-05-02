export const isInputEmpty = (values) => {
  let emptyFields = [];
  for (let key in values) {
    if (
      values[key] === undefined ||
      values[key] === null ||
      values[key] === ""
    ) {
      emptyFields.push(key);
    }
  }

  if (emptyFields.length > 0) {
    throw new Error(
      `The following fields are required: ${emptyFields.join(", ")}`
    );
  }
};
