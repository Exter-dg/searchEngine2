const { processPdf } = require("../util/ocr");

const fileExtract = async (req, res) => {
	console.log(req.file);
	const data = await processPdf(req.file.path);
	res.status(201).send(data);
};

module.exports = {
	fileExtract,
};
