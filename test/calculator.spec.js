import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import { getCalculatorObject } from "../src/controllers/calculator.controller.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Controller Tests", () => {
  describe("initCalculator", () => {
    it("should return a valid response for valid input", async () => {
      const res = await chai.request(app).post("/api.com/init").send({
        operator: "add",
        num1: 5,
        num2: 3,
      });

      expect(res).to.have.status(201);

      expect(res.body).to.deep.equal({
        result: 8,
        totalOps: 1,
        id: res.body.id,
      });
    });

    it("should handle invalid input gracefully", async () => {
      const res = await chai.request(app).post("/api.com/init").send({
        operator: "invalidOperator",
        num1: 5,
        num2: 3,
      });

      expect(res).to.have.status(400);

      expect(res.body.message).to.equal("Invalid operator");
    });

    it("should handle missing parameters gracefully", async () => {
      const res = await chai.request(app).post("/api.com/init").send({
        // Missing operator, num1, and num2 intentionally
      });

      expect(res).to.have.status(400);

      expect(res.body.message).to.equal("Missing required parameters");
    });
  });

  describe("performOperationController", () => {
    it("should perform the operation and return a valid response", async () => {
      // Assuming you have a valid calculatorObject with an existing id
      const existingId = 123;
      getCalculatorObject()[existingId] = {
        result: 5,
        totalOps: 2,
        history: [],
      };

      const res = await chai.request(app).post("/api.com/operation").send({
        operator: "add",
        num: 3,
        id: existingId,
      });

      expect(res).to.have.status(201);

      expect(res.body).to.deep.equal({
        result: 8,
        totalOps: 3,
        id: existingId,
      });
    });

    it("should handle missing parameters gracefully", async () => {
      const res = await chai.request(app).post("/api.com/operation").send({
        // Missing operator, num, and id intentionally
      });

      expect(res).to.have.status(400);

      expect(res.body.message).to.equal("Missing required parameters");
    });

    it("should handle invalid operator gracefully", async () => {
      const res = await chai.request(app).post("/api.com/operation").send({
        operator: "invalidOperator",
        num: 3,
        id: "123",
      });

      expect(res).to.have.status(400);

      expect(res.body.message).to.equal("Invalid operator");
    });

    it("should handle calculator not found gracefully", async () => {
      const res = await chai.request(app).post("/api.com/operation").send({
        operator: "add",
        num: 3,
        id: "nonexistentId",
      });

      expect(res).to.have.status(404);

      expect(res.body.message).to.equal("Calculator not found");
    });
  });

  describe("undoOperationController", () => {
    it("should undo the last operation and return a valid response", async () => {
      const existingId = 123;
      let calculatorObject = getCalculatorObject();

      calculatorObject[existingId] = {
        result: 10,
        totalOps: 3,
        history: [
          { operator: "add", num: 5 },
          { operator: "subtract", num: 2 },
        ],
      };

      const res = await chai.request(app).put("/api.com/undo").send({
        id: existingId,
      });

      expect(res).to.have.status(200);

      expect(res.body).to.deep.equal({
        result: 12, // Result after undoing the last operation
        totalOps: 2, // Total operations after undo
      });
    });

    it("should handle missing parameters gracefully", async () => {
      const res = await chai.request(app).put("/api.com/undo").send({
        // Missing id intentionally
      });

      expect(res).to.have.status(400);

      expect(res.body.message).to.equal("Missing required parameter: id");
    });

    it("should handle calculator not found gracefully", async () => {
      const res = await chai.request(app).put("/api.com/undo").send({
        id: "nonexistentId",
      });

      expect(res).to.have.status(404);

      expect(res.body.message).to.equal("Calculator not found");
    });

    it("should handle undo when history is empty", async () => {
      const existingId = 123;
      let calculatorObject = getCalculatorObject();

      // Assuming you have a valid calculatorObject with an existing id and an empty history
      calculatorObject[existingId] = {
        result: 10,
        totalOps: 3,
        history: [],
      };

      const res = await chai.request(app).put("/api.com/undo").send({
        id: existingId,
      });

      expect(res).to.have.status(200);

      expect(res.body).to.deep.equal({
        result: 10, // Result remains unchanged
        totalOps: 3, // Total operations remain unchanged
      });
    });
  });

  describe("resetCalculatorController", () => {
    it("should reset the calculator and return a success response", async () => {
      const existingId = 123;
      let calculatorObject = getCalculatorObject();

      // Assuming you have a valid calculatorObject with an existing id
      calculatorObject[existingId] = {
        result: 10,
        totalOps: 3,
        history: [
          { operator: "add", num: 5 },
          { operator: "subtract", num: 3 },
        ],
      };

      const res = await chai
        .request(app)
        .get(`/api.com/reset`)
        .send({ id: existingId });

      expect(res).to.have.status(200);

      expect(res.body).to.deep.equal({
        success: true,
        message: `Calculator ${existingId} is now reset`,
      });

      expect(calculatorObject[existingId]).to.be.undefined;
    });

    it("should handle missing parameters gracefully", async () => {
      const res = await chai.request(app).get("/api.com/reset").send({});

      expect(res).to.have.status(400);

      expect(res.body.message).to.equal("Missing required parameter: id");
    });

    it("should handle calculator not found gracefully", async () => {
      const res = await chai
      .request(app)
      .get(`/api.com/reset`)
      .send({ id: '123' });


      expect(res).to.have.status(404);

      expect(res.body.message).to.equal("Calculator not found");
    });
  });
});
