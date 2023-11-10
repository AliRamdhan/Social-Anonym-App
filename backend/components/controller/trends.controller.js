const sequelize = require("sequelize");
const Cerita = require("../model/Cerita/cerita");
const Posts = require("../model/Solusi/posting");
const CommentPost = require("../model/Solusi/posting_comment");
const RepliesPost = require("../model/Solusi/posting_comment_replies");
const LikesPost = require("../model/Solusi/posting_likes");
const Users = require("../model/user");
const Genre = require("../model/Cerita/cerite_genre");
const CommentCerita = require("../model/Cerita/cerita_comment");
const CommentLikes = require("../model/Cerita/cerita_likes");
// Mendapatkan top solusi berdasarkan jumlah likes
const getTopSolutions = async (req, res) => {
  try {
    // Fetch the trending posts based on likes and comments
    const trendingPosts = await Posts.findAll({
      attributes: [
        "id", // Include any other fields you want to retrieve
        "Post_Content",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Post_Likes WHERE Likes_Posts = Posts.id)"
          ),
          "likeCount",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Post_Comments WHERE Comment_Post = Posts.id)"
          ),
          "commentCount",
        ],
      ],
      order: [sequelize.literal("likeCount + commentCount DESC")],
      limit: 5, // Limit the result to the top 5 trending posts
    });

    res
      .status(200)
      .json({ message: "List trending post", Post: trendingPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trending posts" });
  }
};

const getLatestSolutions = async (req, res) => {
  try {
    const solutions = await Posts.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    res.status(200).json({ message: "List latest post", Post: solutions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTopCerita = async (req, res) => {
  try {
    const cerita = await Cerita.findAll({
      attributes: [
        "id", // Include any other fields you want to retrieve
        "Cerita_Content",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Cerita_Likes WHERE Likes_Cerita = Cerita.id)"
          ),
          "likeCount",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Cerita_Comments WHERE Comment_Cerita = Cerita.id)"
          ),
          "commentCount",
        ],
      ],
      include: [
        {
          model: Genre,
          attributes: ["Genre_Cerita"],
        },
      ],
      order: [sequelize.literal("likeCount + commentCount DESC")],
      limit: 5, // Limit the result to the top 5 trending posts
    });
    res.status(200).json({ message: "List top cerita", Cerita: cerita });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLatestCerita = async (req, res) => {
  try {
    const cerita = await Cerita.findAll({
      include: [
        {
          model: Genre,
          attributes: ["Genre_Cerita"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    res.status(200).json({ message: "List latest cerita", Cerita: cerita });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTopGenreCerita = async (req, res) => {
  try {
    const genre = await Genre.findAll({
      attributes: [
        "Genre_Cerita", // Include any other fields you want to retrieve
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Cerita WHERE Cerita_Genre = Genre.id)"
          ),
          "ceritaCount",
        ],
      ],
      order: [[sequelize.literal('"ceritaCount"'), "DESC"]],
      limit: 5, // Limit the result to the top genre with the most "Cerita"
    });
    res.status(200).json({ message: "List top genre", Genre: genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTopCeritaByGenre = async (req, res) => {
  try {
    const topCerita = await Cerita.findAll({
      where: { Cerita_Genre: req.params.genreId },
      include: [
        {
          model: Genre,
          attributes: ["Genre_Cerita"],
        },
      ],
      attributes: [
        "Cerita_Content",
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Cerita_Likes WHERE Likes_Cerita = Cerita.id)"
          ),
          "likeCount",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Cerita_Comments WHERE Comment_Cerita = Cerita.id)"
          ),
          "commentCount",
        ],
      ],
      order: [sequelize.literal("likeCount + commentCount DESC")],
      limit: 5, // Limit the result to the top 5 trending posts
    });

    res
      .status(200)
      .json({ message: "List top cerita by genre", Cerita: topCerita });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLatestCeritaByGenre = async (req, res) => {
  try {
    const cerita = await Cerita.findAll({
      where: { Cerita_Genre: req.params.genreId },
      include: [
        {
          model: Genre,
          attributes: ["Genre_Cerita"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 5, // Limit the result to the top 5 trending posts
    });
    res
      .status(200)
      .json({ message: "List latest top cerita by genre", Cerita: cerita });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getTopSolutions,
  getLatestSolutions,
  getTopCerita,
  getLatestCerita,
  getTopGenreCerita,
  getTopCeritaByGenre,
  getLatestCeritaByGenre,
};
