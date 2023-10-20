const router = require("express").Router();
const {
  authHome,
  authLogin,
  authRegister,
} = require("../controller/auth.controller");
const { isAdmin, isUser } = require("../../middleware/auth.middleware");
const passport = require("../../middleware/passport.middleware");
router.post("/auth/register", authRegister);
router.post("/auth/login", authLogin);
router.get(
  "/auth/home",
  passport.authenticate("jwt", { session: false }),
  isUser,
  authHome
);

router.get(
  "/auth/admin/home",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  authHome
);

module.exports = router;
