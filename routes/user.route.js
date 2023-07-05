const router = require("express").Router();
const { extname } = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    console.log("extname(file?.originalname): ", extname(file?.originalname));
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file?.originalname));
  },
});

const upload = multer({ storage: storage });

const {
  createUser,
  updateUser,
  deleteUser,
  fetchOneUser,
  fetchAllUsers,
} = require("../controllers/user.controller");

const authorize = require("../helpers/authorize");

router.post("/", upload.single("avatar"), createUser);
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", fetchOneUser);
router.get("/", authorize(["admin"]), fetchAllUsers);

module.exports = router;
