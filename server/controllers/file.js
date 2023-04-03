const { processPdf } = require("../util/ocr");
const { addToIndex } = require("../util/search");
const uuid4 = require("uuid4");

const fileExtract = async (req, res) => {
	console.log(req.body.file);
	const data = await processPdf(req.body.file);

	// Store data in index
	const date = new Date().toUTCString();
	addToIndex({
		id: uuid4(),
		content: data.join(" "),
		date,
		name: "File Name",
	});

	res.status(201).send(data);
};

module.exports = {
	fileExtract,
};
