const {
  getAllCerita,
  getDetailsCerita,
  createCerita,
  getCeritaByGenre,
  getAllCommentCerita,
  createCommentCerita,
  createLikesCerita,
  getAllLikesCerita,
} = require("../controller/cerita.controller");
const router = require("express").Router();
router.get("/all", getAllCerita);
router.get("/all/:ceritaId", getDetailsCerita);
router.post("/create", createCerita);
router.get("/comment/all/:ceritaId", getAllCommentCerita);
router.post("/comment/create", createCommentCerita);
router.get("/genre/cerita/:genreId", getCeritaByGenre);
router.get("/likes/all/:ceritaId", getAllLikesCerita);
router.post("/likes/create", createLikesCerita);

module.exports = router;
