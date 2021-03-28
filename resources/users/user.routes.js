const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary config
cloudinary.config({
  cloud_name: "dhafbrype",
  api_key: "833318421752619",
  api_secret: "CR0-aNosIwBAQT33f4Roap3X2Nc",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "tools-market",
      format: "jpg",
      public_id: new Date().toISOString(),
    };
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, //file limit
  },
});
const userController = require("./userController");
const { register, login, getUsers, updateUserStatus } = userController;

router.post("/register", upload.single("avatar"), register); //signup route
router.post("/login", login); //login route
router.get("/", getUsers); //get all users route
router.put("/update/:id", updateUserStatus);

module.exports = router;
