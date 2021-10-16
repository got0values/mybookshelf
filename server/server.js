const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(require("./routes/book"));
// get driver connection
const dbo = require("./db/conn");

// perform a database connection when server starts
dbo.connectToServer();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});