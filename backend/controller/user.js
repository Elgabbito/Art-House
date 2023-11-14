const { updateUserProfile } = require("../models/usermodel");

async function updateProfile(req, res) {
  const updatedFields = req.body;
  console.log(updatedFields);
  try {
    const result = await updateUserProfile(updatedFields, req.params.id);
    res.send({ status: 200, result });
  } catch (error) {
    console.error("Error Updating profile", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = { updateProfile };
