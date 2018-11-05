const BillingCycle = require("../model/billingCycle");
const errorHandler = require("../config/errorHandler");

BillingCycle.methods(["get", "post", "put", "delete"]);

BillingCycle.updateOptions({ new: true, runValidators: true });

BillingCycle.after("post", errorHandler).after("put", errorHandler);

BillingCycle.route("count", (req, res, next) => {
  BillingCycle.count((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
});

BillingCycle.summary = async function(req, res) {
  BillingCycle.aggregate(
    [
      {
        $match: {
          userId: req.params.id
        }
      },
      {
        // Informa qual o criterio que será usado
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" }
        }
      },
      {
        /* Efetua os agrupamentos, no caso sem agrupamentos,
      mas poderia inserir um campo como "$year" ao invez de null em _id */
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" }
        }
      },
      {
        // Informa quais informações serão disponibilizadas
        $project: { _id: 0, credit: 1, debt: 1 }
      }
    ],
    (error, result) => {
      if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json(result[0] || { credit: 0, debt: 0 });
      }
    }
  );
};
module.exports = BillingCycle;
