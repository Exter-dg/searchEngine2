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

module.exports = {
	writeToFile,
	readFile,
	clearFile,
};
