const { exportTextFromFile } = require("../util/tesseract");

const fileExtract = async (req, res) => {
	console.log(req.file.originalname);
	await exportTextFromFile(req.file.path);
	res.status(201).send("Hello world");
};

module.exports = {
	fileExtract,
};
