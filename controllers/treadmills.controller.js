const router = require("express").Router();
const db = require("../database/client");

//Get a list with all the reviews.
router.get("/", (req, res) => {
  return db
    .query(
      `
        SELECT * FROM treadmills;
      `
    )
    .then((dbResponse) => {
      return res.json(dbResponse.rows);
    })
    .catch((error) => console.log(error));
});

//Get and individual review.
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return db
    .query(
      `
        SELECT * FROM treadmills WHERE id=${id};
      `
    )
    .then((dbResponseId) => {
      return res.json(dbResponseId.rows);
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  const { title, description, category, brand, model, author } =
    req.body;

  const date = new Date().toISOString(); // "2023/02/15T21:39:25"

  return db
    .query(
      `
      INSERT INTO treadmills(title, description, category, brand, model, author, is_archive, created_at) 
      VALUES ('${title}', '${description}', '${category}', '${brand}', '${model}', '${author}', '${false}', '${date}')
    `
    )
    .then(() => res.send("Se creo el review correctamente"))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, category, brand, model, author, is_archive } =
    req.body;

  return db
    .query(
      `
            UPDATE treadmills
            SET 
              title = '${title}',
              description = '${description}', 
              category = '${category}',
              brand =  '${brand}',
              model = '${model}',
              author = '${author}',
              is_archive = '${is_archive}'
            WHERE id = ${id};
       `
    )
    .then(() => res.send("Se actualizo el review correctamente"))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  return db
    .query(
      `
        DELETE FROM treadmills WHERE id=${id}
      `
    )
    .then(() => res.send("se elimino el review correctamente"))
    .catch((error) => console.log(error));
});
module.exports = router;
