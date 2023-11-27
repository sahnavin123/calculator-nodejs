import { Router } from "express";
import {
  initCalculator,
  performOperationController,
  resetCalculatorController,
  undoOperationController,
} from "../controllers/calculator.controller.js";

const router = Router();

router.post("/init", initCalculator);
router.post("/operation", performOperationController);
router.put("/undo", undoOperationController);
router.get("/reset", resetCalculatorController);

export default router;
