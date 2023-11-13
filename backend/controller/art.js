const { storeArtData } = require("../models/artmodel");
const uploadImage = require("../cloudinary/index");

const uploadArt = async (req, res) => {
  try {
    const fileName = req.file.originalname;
    const cloudinaryResponse = await uploadImage(req.file.path);
    const { public_id, url } = cloudinaryResponse;
    const result = storeArtData(fileName, public_id, url);

    res.status(200).send({
      message: "Image uploaded successfully",
      data: { url: result.url, name: result.name },
    });
  } catch (error) {
    console.error("Error Uploading Art", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

module.exports = { uploadArt };
