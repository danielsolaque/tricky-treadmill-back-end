const router = require("express").Router();

//Get a list with all the reviews.
router.get("/", (req, res) => { 
    res.send ("aqui van todos los reviews")
})
 //Get and individual review.
router.get("/:id", (req, res) => {
    res.send ("aqui va un solo review")
})

router.post("/", (req, res) => {
    res.send("aqui vamos a crear un nuevo review")
})

router.put("/:id", (req, res) => {
    res.send("aqui vamos a editar un review")
})

router.delete("/:id", (req, res) => {
    res.send("aqui vamos a borrar un review")
})
module.exports = router;