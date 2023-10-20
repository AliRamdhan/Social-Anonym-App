const {
  getTopSolutionsByLikes,
  getTopSolutionsByComments,
  getTopSolutionsByReplies,
} = require("../controller/trends.controller");
const router = require("express").Router();

router.get("/tops/likes", getTopSolutionsByLikes);
router.get("/tops/comments", getTopSolutionsByComments);
router.get("/tops/replies", getTopSolutionsByReplies);

module.exports = router;
