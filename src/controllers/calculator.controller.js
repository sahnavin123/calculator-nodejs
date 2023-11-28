import { asyncHandler } from "../utils/asyncHandler.js";

import {
  getInverseOperator,
  isValidOperator,
  performOperation,
} from "../utils/calcultorHelper.js";

let calculatorObject = {};
export const getCalculatorObject = () => calculatorObject;

export const initCalculator = asyncHandler(async (req, res) => {
  const { operator, num1, num2 } = req.body;

  if (!operator || !num1 || !num2) {
    res.status(400);
    throw new Error("Missing required parameters");
  }

  if (!isValidOperator(operator)) {
    res.status(400);
    throw new Error("Invalid operator");
  }

  const id = Math.floor(Math.random() * 900) + 100;

  const result = performOperation(operator, num1, num2);
  calculatorObject[id] = { result, totalOps: 1, history: [] };

  res.status(201).json({ result, totalOps: 1, id });
});

export const performOperationController = asyncHandler(async (req, res) => {
  const { operator, num, id } = req.body;

  if (!operator || !num || !id) {
    res.status(400);
    throw new Error("Missing required parameters");
  }

  if (!isValidOperator(operator)) {
    res.status(400);
    throw new Error("Invalid operator");
  }

  if (!calculatorObject[id]) {
    res.status(404);
    throw new Error("Calculator not found");
  }

  const { result, totalOps, history } = calculatorObject[id];
  const newResult = performOperation(operator, result, num);

  calculatorObject[id] = {
    result: newResult,
    totalOps: totalOps + 1,
    history: [...history, { operator, num }],
  };

  res.status(201).json({ result: newResult, totalOps: totalOps + 1, id });
});

export const undoOperationController = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Missing required parameter: id");
  }

  if (!calculatorObject[id]) {
    res.status(404);
    throw new Error("Calculator not found");
  }

  const { result, totalOps, history } = calculatorObject[id];
  if (history.length === 0) {
    res.json({ result, totalOps });
  } else {
    const lastOperation = history[history.length - 1];
    const undoResult = performOperation(
      getInverseOperator(lastOperation.operator),
      result,
      lastOperation.num
    );
    calculatorObject[id] = {
      result: undoResult,
      totalOps: totalOps - 1,
      history: history.slice(0, -1),
    };
    res.json({ result: undoResult, totalOps: totalOps - 1 });
  }
});

export const resetCalculatorController = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Missing required parameter: id");
  }

  if (!calculatorObject[id]) {
    res.status(404);
    throw new Error("Calculator not found");
  }

  delete calculatorObject[id];
  res.json({ success: true, message: `Calculator ${id} is now reset` });
});
