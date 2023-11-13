// const { storeArt } = require("../models/artmodel");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

async function uploadArt(req, res, next) {
  const fileName = req.params.id;

  try {
    req.on("data", (chunk) => {
      fs.appendFileSync(fileName, chunk); // append to a file on the disk
    });

    req.on("end", () => {
      return res.end("Yay! File is uploaded.");
    });
    // res.send(`../${fileName}`);
    req.fileName = fileName;
    return next();
  } catch (error) {
    console.error("Error Updating profile", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

// Functions
const uploadImage = async (req) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  console.log(req.fileName);
  const imagePath = `../${req.fileName}`;

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadArt, uploadImage };
