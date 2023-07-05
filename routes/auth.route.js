const router = require("express").Router();

const {
  userLogin,
  validateToken,
  passwordResetLink,
  refreshToken,
} = require("../controllers/auth.controller");

router.post("/login", userLogin);
router.post("/validate-token", validateToken);
router.post("/reset-password", passwordResetLink);
router.post("/refresh-token", refreshToken);

module.exports = router;
