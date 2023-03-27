const fs = require("fs").promises;
const fileName = "index.txt";

const writeToFile = async (content) => {
	await fs.appendFile(fileName, content);
};

const clearFile = async () => {
	await fs.writeFile(fileName, "");
};

const readFile = async () => {
	const content = await fs.readFile(fileName);
	return content.toString();
};

// Helper functions for storing content
const writeContentToJson = async (content) => {
	let data = await readContentFromJson();
	data = JSON.parse(data);
	data.push(content);
	await fs.writeFile("content.json", JSON.stringify(data));
};

const readContentFromJson = async () => {
	const data = await fs.readFile("content.json");
	return data;
};

module.exports = {
	writeToFile,
	readFile,
	clearFile,
	writeContentToJson,
	readContentFromJson,
};
