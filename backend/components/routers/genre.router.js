const router = require("express").Router();
const {
  getAllGenreCerita,
  editGenreCerita,
  getDetailsGenre,
  createGenreCerita,
  deleteGenreCerita,
} = require("../controller/genre.controller");

router.get("/all", getAllGenreCerita);
router.get("/:genreId", getDetailsGenre);
router.post("/create", createGenreCerita);
router.put("/edit/:genreId", editGenreCerita);
router.delete("/delete/:genreId", deleteGenreCerita);

module.exports = router;
