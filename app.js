require("dotenv").config();

const cors = require("cors");
const server = require("express");
const db = require("./database/client");

const treadmillsController = require("./controllers/treadmills.controller");

const app = server();

app.use(server.json());
app.use(cors());

//Making the routes:

app.get("/", (req, res) => {
  res.send("Welcome to tricky treadmills App");
});

app.use("/treadmills", treadmillsController);

app.get("/*", (req, res) => {
  res.status(404).send("Page doesn't exist");
});

app.listen(3001, () => console.log("Running great"));

module.exports = app;
