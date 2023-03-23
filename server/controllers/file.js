const { exportTextFromFile } = require("../util/tesseract")

const fileExtract = async (req, res) => {
	await exportTextFromFile();
	res.status(201).send("Hello world");
}

module.exports = {
	fileExtract
}