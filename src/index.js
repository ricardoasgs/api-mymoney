const app = require("./config/express");
require("./config/database");
require("./routes/billingCycleRoutes")(app);
