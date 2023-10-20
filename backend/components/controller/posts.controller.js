const Users = require("../model/user");
const Posts = require("../model/Solusi/posting");
const Likes = require("../model/Solusi/posting_likes");
const Comments = require("../model/Solusi/posting_comment");
const Replies = require("../model/Solusi/posting_comment_replies");

const getAllUserPost = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.status(200).json({ message: "List all post", Posts: posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUserPost = async (req, res) => {
  const { Post_Content, Post_User } = req.body;
  try {
    const user = await Users.findByPk(Post_User);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const posts = await Posts.create({
      Post_Content: Post_Content,
      Post_User: user.id,
    });
    res
      .status(200)
      .json({ message: "created a post succesfully", Post: posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailsUserPost = async (req, res) => {
  try {
    const post = await Posts.findOne({
      where: {
        id: req.params.postId,
      },
      include: [
        {
          model: Users,
          attributes: ["User_username", "User_email"],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Details post", Post: post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentPost = async (req, res) => {
  try {
    const comments = await Comments.findAll({
      where: { Comment_Post: req.params.postId },
    });
    const commentsCount = await Comments.count({
      where: { Comment_Post: req.params.postId },
    });
    res.status(200).json({
      message: "Comment of the post",
      Comments: comments,
      CommentsCount: commentsCount,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createCommentsPost = async (req, res) => {
  const { Comment_Content, Comment_Post, Comment_User } = req.body;
  try {
    const user = await Users.findByPk(Comment_User);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const posts = await Posts.findByPk(Comment_Post);
    if (!posts) {
      res.status(400).json({ message: "posts not found" });
    }

    const comments = await Comments.create({
      Comment_Content: Comment_Content,
      Comment_Post: posts.id,
      Comment_User: user.id,
    });
    res.status(200).json({
      message: "Comments created was succesfully",
      Comments: comments,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRepliesCommentsPost = async (req, res) => {
  try {
    const replies = await Replies.findAll({
      where: { Replies_Comments: req.params.commentId },
    });
    const repliescount = await Replies.count({
      where: { Replies_Comments: req.params.commentId },
    });
    res.status(200).json({
      message: "List replies of comments",
      Replies: replies,
      RepliesCount: repliescount,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createRepliesCommentsPost = async (req, res) => {
  const { Reply_Content, Replies_Comments, Replies_Users } = req.body;
  try {
    const user = await Users.findByPk(Replies_Users);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }

    const comments = await Comments.findByPk(Replies_Comments);
    if (!comments) {
      res.status(400).json({ message: "comments not found" });
    }

    const replies = await Replies.create({
      Reply_Content: Reply_Content,
      Replies_Comments: comments.id,
      Replies_Users: user.id,
    });
    res
      .status(200)
      .json({ message: "Replay created succesfully", Replies: replies });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllLikesPost = async (req, res) => {
  try {
    const likes = await Likes.findAll({
      where: { Likes_Posts: req.params.postId },
    });
    const likesCount = await Likes.count({
      Likes_Posts: req.params.postId,
    });
    res
      .status(200)
      .json({ message: "Likes of post", Likes: likes, LikeCount: likesCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createLikesPost = async (req, res) => {
  const { Likes_Posts, Likes_Users } = req.body;
  try {
    const posts = await Posts.findByPk(Likes_Posts);
    if (!posts) {
      return res.status(404).json({ error: "Post not found" });
    }
    const users = await Users.findByPk(Likes_Users);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the like already exists for the user and post
    const existingLike = await Likes.findOne({
      where: { Likes_Posts: posts.id, Likes_Users: users.id },
    });

    if (existingLike) {
      // If the like already exists, delete it and respond with a message
      await existingLike.destroy();
      return res.status(200).json({ message: "Like was removed" });
    } else {
      // If the like doesn't exist, create it and respond with a success message
      const likes = await Likes.create({
        Likes_Posts: posts.id,
        Likes_Users: users.id,
      });

      return res.status(200).json({
        message: "Like was created successfully",
        Likes: likes,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUserPost,
  createUserPost,
  getDetailsUserPost,
  getCommentPost,
  createCommentsPost,
  getRepliesCommentsPost,
  createRepliesCommentsPost,
  getAllLikesPost,
  createLikesPost,
};
