const mongoose = require("mongoose");
const Db = process.env.ATLAS_URI;

 
var _db;
 
module.exports = {
  connectToServer: function () {
      mongoose.connect(Db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
      _db = mongoose.connection;
      _db.on("error", console.error.bind(console, "connection error:"));
      _db.once("open", () => {
      console.log("Database connected");
      });
  },
 
  getDb: function () {
    return _db;
  },
};