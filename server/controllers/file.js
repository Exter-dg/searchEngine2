const { processPdf } = require("../util/helper");

const fileExtract = async (req, res) => {
	console.log(req.file.originalname);
	const data = await processPdf(req.file.path);
	res.status(201).send(data);
};

module.exports = {
	fileExtract,
};
