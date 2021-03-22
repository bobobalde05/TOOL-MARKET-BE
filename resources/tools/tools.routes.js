const express = require("express");

const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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
    fileSize: 1024 * 1024 * 2, //limit file size to 2mb
  },
});
const toolController = require("./toolsController");
const { postTool } = toolController;

router.post("/register", upload.single("avatar"), postTool);

module.exports = router;
