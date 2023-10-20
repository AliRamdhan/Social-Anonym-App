const sequelize = require("sequelize");
const Cerita = require("../model/Cerita/cerita");
const Genre = require("../model/Cerita/cerita");
const Posts = require("../model/Solusi/posting");
const CommentPost = require("../model/Solusi/posting_comment");
const RepliesPost = require("../model/Solusi/posting_comment_replies");
const LikesPost = require("../model/Solusi/posting_likes");

// Mendapatkan top solusi berdasarkan jumlah likes
const getTopSolutionsByLikes = async (req, res) => {
  try {
    const topSolutions = await Posts.findAll({
      attributes: [
        "id",
        "Post_Content",
        [sequelize.fn("COUNT", sequelize.col("Likes.id")), "likeCount"],
      ],
      include: [
        {
          model: LikesPost,
          attributes: [],
        },
      ],
      group: ["Posts.id"],
      order: [[sequelize.literal("likeCount"), "DESC"]],
      limit: 10, // Ubah sesuai dengan jumlah solusi teratas yang Anda inginkan
    });
    res.json(topSolutions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam mengambil top solusi." });
  }
};

// Mendapatkan top solusi berdasarkan jumlah comments
const getTopSolutionsByComments = async (req, res) => {
  try {
    const topSolutions = await Posts.findAll({
      attributes: [
        "id",
        "Post_Content",
        [sequelize.fn("COUNT", sequelize.col("Comments.id")), "commentCount"],
      ],
      include: [
        {
          model: CommentPost,
          attributes: [],
        },
      ],
      group: ["Posts.id"],
      order: [[sequelize.literal("commentCount"), "DESC"]],
      limit: 10, // Ubah sesuai dengan jumlah solusi teratas yang Anda inginkan
    });
    res.json(topSolutions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam mengambil top solusi." });
  }
};

// Mendapatkan top solusi berdasarkan jumlah replies comments
const getTopSolutionsByReplies = async (req, res) => {
  try {
    const topSolutions = await Posts.findAll({
      attributes: [
        "id",
        "Post_Content",
        [
          sequelize.fn("COUNT", sequelize.col("Comments.Replies.id")),
          "replyCount",
        ],
      ],
      include: [
        {
          model: CommentPost,
          attributes: [],
          include: [
            {
              model: RepliesPost,
              attributes: [],
            },
          ],
        },
      ],
      group: ["Posts.id"],
      order: [[sequelize.literal("replyCount"), "DESC"]],
      limit: 10, // Ubah sesuai dengan jumlah solusi teratas yang Anda inginkan
    });
    res.json(topSolutions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam mengambil top solusi." });
  }
};

module.exports = {
  getTopSolutionsByLikes,
  getTopSolutionsByComments,
  getTopSolutionsByReplies,
};
