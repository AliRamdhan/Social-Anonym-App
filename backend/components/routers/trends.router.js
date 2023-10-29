const {
  getTopSolutions,
  getLatestSolutions,
  getTopCerita,
  getLatestCerita,
  getTopGenreCerita,
  getTopCeritaByGenre,
  getLatestCeritaByGenre,
} = require("../controller/trends.controller");
const router = require("express").Router();

router.get("/post", getTopSolutions);
router.get("/post/latest", getLatestSolutions);
router.get("/cerita", getTopCerita);
router.get("/cerita/latest", getLatestCerita);
router.get("/genre", getTopGenreCerita);
router.get("/genre/top/:genreId", getTopCeritaByGenre);
router.get("/genre/latest/:genreId", getLatestCeritaByGenre);
module.exports = router;
