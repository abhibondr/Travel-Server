const router = require("express").Router();
const { extname } = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/places");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file?.originalname));
  },
});

const upload = multer({ storage: storage });

const {
  createDestination,
  updateDestination,
  deleteDestination,
  fetchOneDestination,
  fetchAllDestinations,
} = require("../controllers/destination.controller");

router.post("/", upload.array("images"), createDestination);
router.put("/:id", upload.array("images"), updateDestination);
router.delete("/:id", deleteDestination);
router.get("/:id", fetchOneDestination);
router.get("/", fetchAllDestinations);

module.exports = router;
