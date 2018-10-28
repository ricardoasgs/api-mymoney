const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://admin:admin123@ds255539.mlab.com:55539/my-money",
  err => {
    if (err) {
      console.log("ERROR ON CONNECT TO DATABASE");
    } else {
      console.log("DATABASE CONNECTED");
    }
  }
);

module.exports = mongoose;
