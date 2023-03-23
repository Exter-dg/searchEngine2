// import Tesseract from 'tesseract.js';
const Tesseract = require("tesseract.js");
// const imageData = require("../testData/document3.jpeg");
// import imageData from "../testData/document3.jpeg";
const fs = require("fs").promises;

const readFile = async (path) => {
	const data = await fs.readFile(path);
	return data;
};

const exportTextFromFile = async (path) => {
	const fileData = await readFile(path);
	const content = await Tesseract.recognize(fileData, "eng", {
		logger: (m) => {
			return;
		},
	});
	console.log("Content : ", content.data.text);

	//   .then(({ data: { text } }) => {
	// 	console.log(text);
	//   })
};

module.exports = {
	exportTextFromFile,
};
