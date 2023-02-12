const server = require("express");
const app = server();

const treadmillsController = require ("./treadmills.controller")
app.use(server.json());

//Making the routes:

app.get("/", (req, res) => {
    res.send("Welcome to tricky treadmills App")
});

app.use("/treadmills", treadmillsController);

app.get("/*", (req, res) => {
    res.status(404).send("Page doesn't exist")
})

app.listen(3001, () => console.log('Running great'))

module.exports = app;