const getCharacterValidationError = (str: string) => {
  if (str === "digit") {
    return `Password must have at least 1 number`;
  } else {
    return `Password must have at least 1 ${str} character`;
  }
};

export default getCharacterValidationError;
