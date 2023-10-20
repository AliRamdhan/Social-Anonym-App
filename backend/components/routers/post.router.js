const {
  getAllUserPost,
  createUserPost,
  getDetailsUserPost,
  getCommentPost,
  createCommentsPost,
  getRepliesCommentsPost,
  createRepliesCommentsPost,
  getAllLikesPost,
  createLikesPost,
} = require("../controller/posts.controller");
const router = require("express").Router();
const { uploadPosts } = require("../../middleware/multer.middleware");
router.get("/posts/all", getAllUserPost);
router.post(
  "/posts/create",
  uploadPosts.single("Post_Picture"),
  createUserPost
);
router.get("/post/details/:postId", getDetailsUserPost);
router.get("/comments/all/:postId", getCommentPost);
router.post("/comments/create", createCommentsPost);
router.get("/replies/all/:commentId", getRepliesCommentsPost);
router.post("/replies/create", createRepliesCommentsPost);
router.get("/likes/all/:postId", getAllLikesPost);
router.post("/likes/create", createLikesPost);

module.exports = router;
