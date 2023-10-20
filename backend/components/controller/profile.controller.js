const User = require("../model/user");
const Profile = require("../model/user_profile");

const getUserProfiles = async (req, res) => {
  try {
    const Profiles = await Profile.findOne({
      where: { Profile_User: req.params.userId },
    });
    res.status(200).json({ message: "Profile user by Id", Profile: Profiles });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUserProfile = async (req, res) => {
  const { Profile_firstname, Profile_lastname, Profile_bio } = req.body;
  const Profile_picture = req.file;
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const profile = await Profile.create({
      Profile_firstname: Profile_firstname,
      Profile_lastname: Profile_lastname,
      Profile_bio: Profile_bio,
      Profile_User: user.id,
      Profile_picture: Profile_picture.filename,
    });
    res.status(200).json({
      message: "Profile user was create succesfull",
      Profile: profile,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { Profile_firstname, Profile_lastname, Profile_bio, Profile_picture } =
    req.body;
  try {
    const profile = await Profile.findOne({
      where: { Profile_User: req.params.userId },
    });
    if (!profile) {
      res.status(400).json({ message: "profile not found" });
    }
    if (Profile_firstname) {
      profile.Profile_firstname = Profile_firstname;
    }
    if (Profile_lastname) {
      profile.Profile_lastname = Profile_lastname;
    }
    if (Profile_bio) {
      profile.Profile_bio = Profile_bio;
    }
    if (Profile_picture) {
      profile.Profile_picture = Profile_picture;
    }
    await profile.save();
    res.status(200).json({
      message: "profile user was updated succesfully",
      Profile: profile,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserProfiles,
  createUserProfile,
  updateUserProfile,
};
