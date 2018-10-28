const express = require("express");
const BillingCycle = require("../controller/billingCycleController");

const router = express.Router();

module.exports = app => {
  app.use("/api", router);
  BillingCycle.register(router, "/billingCycles");
};
