const { storeArtData } = require("../models/artmodel");
const uploadImage = require("../cloudinary/index");

const uploadArt = async (req, res) => {
  try {
    console.log(req.body);
    const { title, cost, description, type } = req.body;
    const cloudinaryResponse = await uploadImage(req.file.path);
    const { public_id, url } = cloudinaryResponse;
    const result = await storeArtData(
      title,
      public_id,
      url,
      cost,
      type,
      description
    );
    res.status(200).json({
      message: "Image uploaded successfully",
      data: { url: result.url, name: result.name },
      status: 200,
    });
  } catch (error) {
    console.error("Error Uploading Art", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

module.exports = { uploadArt };
