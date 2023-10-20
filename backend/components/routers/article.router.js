const router = require("express").Router();
const {
  getAllArticles,
  getDetailsArticle,
  createOneArticle,
  updateOneArticle,
  removeOneArticle,
} = require("../controller/article.controller");
const { uploadArticle } = require("../../middleware/multer.middleware");
router.get("/all", getAllArticles);
router.get("/:articleId", getDetailsArticle);
router.post(
  "/create",
  uploadArticle.single("Artikel_Picture"),
  createOneArticle
);
router.put(
  "/update/:articleId",
  uploadArticle.single("Artikel_Picture"),
  updateOneArticle
);
router.delete("/delete/:articleId", removeOneArticle);

module.exports = router;
