require("dotenv").config(); ///el ejecutador del de la variable de entorno

const cors = require("cors");
const server = require("express");
const db = require("./database/client");

const treadmillsController = require("./controllers/treadmills.controller");

const app = server();

app.use(server.json());
app.use(cors({origin: "*",}));
app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header("Acces-Control-Allow-Headers");
  next();
})

//Making the routes:

app.get("/", (req, res) => {
  res.send("Welcome to tricky treadmills App");
});

app.use("/treadmills", treadmillsController);

app.get("/*", (req, res) => { ///un manejador para las rutas que no sean ninguna de las anteriores
  res.status(404).send("Page doesn't exist");
});

app.listen(3001, () => console.log("Running great"));

module.exports = app;
