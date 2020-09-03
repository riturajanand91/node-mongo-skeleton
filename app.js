const express = require("express");
require("./database/mongoose"); //requiring db for the whole app();

const bodyParser = require("body-parser");
const chalk = require("chalk");
const userRoutes = require("./routing/routes");
require("dotenv").config({ path: "config/dev.env" });
const cors = require("cors");

const app = express(); //binding app to express middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.use(userRoutes);

///Creating our server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(chalk.blue("Server is running on port " + process.env.PORT));
});
