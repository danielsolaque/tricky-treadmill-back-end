const multer = require("multer");
const {
  uploadImage,
  isValidImgExtension,
} = require("../services/imagesUploading.service");

const router = require("express").Router();
const db = require("../database/client");

const fileMiddleware = multer({ dest: "uploads/" });

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

router.post("/", fileMiddleware.single("thumbnail"), (req, res) => {
  const { title, description, category, brand, model, author } = req.body;
  const thumbnail = req.file;

  if (!isValidImgExtension(thumbnail.mimetype)) {
    return res.status(400).send("Invalid image");
  }

  return uploadImage(thumbnail.path, { public_id: thumbnail.filename })
    .then((imgResponse) => {
      const date = new Date().toISOString(); // "2023/02/15T21:39:25"

      return db
        .query(
          `
            INSERT INTO treadmills(title, description, category, brand, model, author, thumbnail_url, is_archive, created_at) 
            VALUES (
              '${title}', 
              '${description}', 
              '${category}', 
              '${brand}', 
              '${model}', 
              '${author}', 
              '${imgResponse.url}', 
              '${false}', 
              '${date}'
            )
          `
        )
        .then(() => res.send("The review was created correctly"))
        .catch((err) => {
          console.log(err);

          res.status(500).send(err);
        });
    })
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", fileMiddleware.single("thumbnail"), (req, res) => {
  const id = req.params.id;
  const { title, description, category, brand, model, author, is_archive } =
    req.body;
  const thumbnail = req.file;

  if (!isValidImgExtension(thumbnail.mimetype)) {
    return res.status(400).send("Invalid image");
  }

  return uploadImage(thumbnail.path, { public_id: thumbnail.filename })
    .then((imgResponse) => {
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
              thumbnail_url = '${imgResponse.url}',
              is_archive = '${is_archive}'
            WHERE id = ${id};
       `
        )
        .then(() => res.send("The review has been updated correctly"))
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(500).send(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  return db
    .query(
      `
        DELETE FROM treadmills WHERE id=${id}
      `
    )
    .then(() => res.send("the review was successfully removed"))
    .catch((error) => console.log(error));
});
module.exports = router;

//Testing Code track

