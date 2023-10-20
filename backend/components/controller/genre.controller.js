const Genre = require("../model/Cerita/cerite_genre");

const getAllGenreCerita = async (req, res) => {
  try {
    const genre = await Genre.findAll();
    res.status(200).json({ message: "List all genre", Genre: genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailsGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.genreId);
    res.status(200).json({ message: "Details genre", Genre: genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createGenreCerita = async (req, res) => {
  const { Genre_Cerita } = req.body;
  try {
    const genre = await Genre.create({ Genre_Cerita: Genre_Cerita });
    res
      .status(200)
      .json({ message: "Genre create successfully", Genre: genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editGenreCerita = async (req, res) => {
  const { Genre_Cerita } = req.body;
  try {
    const genre = await Genre.findByPk(req.params.genreId);
    if (!genre) {
      res.status(404).json({ message: "genre not found" });
    }
    if (Genre_Cerita) {
      genre.Genre_Cerita = Genre_Cerita;
    }
    await genre.save();
    res.status(200).json({ message: "Genre update succesfully", Genre: genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGenreCerita = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.genreId);
    if (!genre) {
      res.status(404).json({ message: "genre not found" });
    } else {
      await genre.destroy();
    }
    res
      .status(200)
      .json({ message: "Delete genre cerita succesfull", Genre: genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllGenreCerita,
  getDetailsGenre,
  createGenreCerita,
  editGenreCerita,
  deleteGenreCerita,
};
