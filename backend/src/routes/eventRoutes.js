const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs")
const {
  createEvent,
  getAllEvents,
  getMyEvents,
  deleteEvent,
  updateEvent,
  getEventById,
  rsvpEvent,
} = require("../controllers/eventController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads/");

    // Check if the folder exists, and if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});




router.get("/my-events", protect, getMyEvents);
router.post("/create", protect, upload.single("image"), createEvent);
router.get("/all", getAllEvents);
router.delete("/:id", protect, deleteEvent);

router.put("/:id", protect, upload.single("image"), updateEvent);

router.get("/:id", getEventById);

router.post("/:id/rsvp", protect, rsvpEvent);

module.exports = router;
