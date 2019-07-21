const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router
  .route("/")
  .get(booksController.findAll)
  .post(booksController.create);

router.route("/search").post((req, res) => {
  console.log(req.body);
  res.json({ working: "working" });
});

// Matches with "/api/books/:id"
router
  .route("/:id")

  .delete(booksController.remove);

module.exports = router;
