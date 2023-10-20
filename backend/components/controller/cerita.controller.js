const Cerita = require("../model/Cerita/cerita");
const Genre = require("../model/Cerita/cerite_genre");
const Likes = require("../model/Cerita/cerita_likes");
const Comment = require("../model/Cerita/cerita_comment");
const User = require("../model/user");

const getAllCerita = async (req, res) => {
  try {
    const cerita = await Cerita.findAll({
      include: [
        {
          model: Genre,
          attributes: ["Genre_Cerita"],
        },
      ],
    });
    res.status(200).json({ message: "List all cerita", Cerita: cerita });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailsCerita = async (req, res) => {
  try {
    const cerita = await Cerita.findByPk(req.params.ceritaId);
    res.status(200).json({ message: "Details cerita", Cerita: cerita });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCerita = async (req, res) => {
  const { Cerita_Content, Cerita_User, Cerita_Genre } = req.body;
  try {
    const user = await User.findByPk(Cerita_User);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const genre = await Genre.findByPk(Cerita_Genre);
    if (!genre) {
      res.status(404).json({ message: "genre not found" });
    }
    const cerita = await Cerita.create({
      Cerita_Content: Cerita_Content,
      Cerita_User: user.id,
      Cerita_Genre: genre.id,
    });
    res
      .status(200)
      .json({ message: "Create cerita succesfully", Cerita: cerita });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCeritaByGenre = async (req, res) => {
  try {
    const cerita = await Cerita.findAll({
      where: { Cerita_Genre: req.params.genreId },
    });
    res.status(200).json({ message: "List cerita by genre", Cerita: cerita });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCommentCerita = async (req, res) => {
  try {
    const comment = await Comment.findAll({
      where: { Comment_Cerita: req.params.ceritaId },
    });
    res.status(200).json({ message: "List all comments", Comment: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCommentCerita = async (req, res) => {
  const { Comment_Content, Comment_Cerita, Comment_User } = req.body;
  try {
    const user = await User.findByPk(Comment_User);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const cerita = await Cerita.findByPk(Comment_Cerita);
    if (!cerita) {
      res.status(404).json({ message: "cerita not found" });
    }
    const comment = await Comment.create({
      Comment_Content: Comment_Content,
      Comment_Cerita: cerita.id,
      Comment_User: user.id,
    });
    res
      .status(200)
      .json({ message: "comment create succesfully", Comment: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createLikesCerita = async (req, res) => {
  const { Likes_Cerita, Likes_Users } = req.body;
  try {
    const user = await User.findByPk(Likes_Users);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const cerita = await Cerita.findByPk(Likes_Cerita);
    if (!cerita) {
      res.status(404).json({ message: "genre not found" });
    }
    const existingLike = await Likes.findOne({
      where: { Likes_Cerita: cerita.id, Likes_Users: user.id },
    });

    if (existingLike) {
      // If the like already exists, delete it and respond with a message
      await existingLike.destroy();
      return res.status(200).json({ message: "Like was removed" });
    } else {
      // If the like doesn't exist, create it and respond with a success message
      const likes = await Likes.create({
        Likes_Cerita: cerita.id,
        Likes_Users: user.id,
      });

      return res.status(200).json({
        message: "Like was created successfully",
        Likes: likes,
      });
    }
    res.status(200).json({ message: "Likes succesfully", Likes: likes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllLikesCerita = async (req, res) => {
  try {
    const likes = await Likes.findAll({
      where: { Likes_Cerita: req.params.ceritaId },
    });
    const likesCount = await Likes.count({
      Likes_Cerita: req.params.ceritaId,
    });
    res
      .status(200)
      .json({ message: "likes cerita", Likes: likes, LikeCount: likesCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCerita,
  getDetailsCerita,
  createCerita,
  getCeritaByGenre,
  getAllCommentCerita,
  createCommentCerita,
  createLikesCerita,
  getAllLikesCerita,
};
