export const isValidOperator = (operator) => {
  const validOperators = ["add", "subtract", "multiply", "divide"];
  return validOperators.includes(operator);
};

export const performOperation = (operator, num1, num2) => {
  num1 = parseInt(num1);
  num2 = parseInt(num2);

  if (operator === "divide" && num2 === 0) {
    throw new Error("Cannot divide by zero");
  }

  switch (operator) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num1 / num2;
    default:
      return null;
  }
};

export const getInverseOperator = (operator) => {
  switch (operator) {
    case "add":
      return "subtract";
    case "subtract":
      return "add";
    case "multiply":
      return "divide";
    case "divide":
      return "multiply";
    default:
      return null;
  }
};
