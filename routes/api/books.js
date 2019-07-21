const router = require("express").Router();
const booksController = require("../../controllers/booksController");
require("dotenv").config();
const axios = require("axios");

// Matches with "/api/books"
router
  .route("/")
  .get(booksController.findAll)
  .post(booksController.create);

router.route("/search").post((req, res) => {
  const title = req.body.term;
  console.log(
    `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${
      process.env.GBOOKS_KEY
    }`
  );
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${
        process.env.GBOOKS_KEY
      }`
    )
    .then(response => {
      res.json(response.data.items);
    })
    .catch(err => {
      res.json({ err });
    });
});

// Matches with "/api/books/:id"
router
  .route("/:id")

  .delete(booksController.remove);

module.exports = router;
