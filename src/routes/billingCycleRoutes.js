const express = require("express");
const BillingCycle = require("../controller/billingCycleController");
const User = require("../controller/userController");
const auth = require("../middlewares/auth");

const router = express.Router();
const authRouter = express.Router();

module.exports = app => {
  app.use("/oapi/auth", authRouter);

  authRouter.post("/login", User.login);
  authRouter.post("/signup", User.signup);
  authRouter.post("/validateToken", User.validateToken);

  app.use("/api", router);

  router.use(auth);

  BillingCycle.register(router, "/billingCycles");
  router.get("/billingCycles/summary/:id", BillingCycle.summary);
};
