const {
	storeArtData,
	getArtData,
	getSingleArt,
	getArtByCategory,
	getFilteredArt,
} = require("../models/artmodel");
const fs = require("fs");
const uploadImage = require("../cloudinary/index");

const uploadArt = async (req, res) => {
	try {
		console.log(req.body);
		const { title, cost, description, type, location, purchase_type } =
			req.body;
		const cloudinaryResponse = await uploadImage(req.file.path);
		const { public_id, secure_url } = cloudinaryResponse;
		const result = await storeArtData(public_id, secure_url, req.body);
		res.status(200).json({
			message: "Image uploaded successfully",
			data: { url: result.url, name: result.name },
			status: 200,
		});
		fs.unlinkSync(req.file.path);
	} catch (error) {
		console.error("Error Uploading Art", error);
		res
			.status(500)
			.json({ success: false, message: "Internal Server Error", error: error });
	}
};

const fetchArt = async (req, res) => {
	const result = await getArtData();
	res.send({ message: "Success", data: result, status: 200 });
};

const fetchTopArtByCategory = async (req, res) => {
	const result = await getArtByCategory();
	res.send({ message: "Success", data: result, status: 200 });
};

const fetchFilteredArt = async (req, res) => {
	try {
		const { min, max, name, location, category } = req.query;
		console.log(min, max, name, location, category);
		console.log(req.query);
		const result = await getFilteredArt(min, max, name, location, category);
		res.send(result);
	} catch (error) {
		res.send(error);
		console.log(error);
	}
};

const fetchSingleArt = async (req, res) => {
	const { id } = req.query;
	console.log(req.query);
	const result = await getSingleArt(id);
	res.send(result);
};

module.exports = {
	uploadArt,
	fetchArt,
	fetchTopArtByCategory,
	fetchSingleArt,
	fetchFilteredArt,
};
