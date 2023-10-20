const {
  getUserProfiles,
  createUserProfile,
  updateUserProfile,
} = require("../controller/profile.controller");
const router = require("express").Router();
const { uploadProfile } = require("../../middleware/multer.middleware");
router.get("/profiles/:userId", getUserProfiles);
router.post(
  "/profiles/create/:userId",
  uploadProfile.single("Profile_picture"),
  createUserProfile
);
router.put(
  "/profiles/update/:userId",
  uploadProfile.single("Profile_picture"),
  updateUserProfile
);

module.exports = router;
