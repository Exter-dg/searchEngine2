const { Document } = require("flexsearch");
const { clearFile, writeToFile, readFile } = require("./helper");

let index = new Document({
	document: {
		id: "id",
		index: ["content"],
		store: ["content"],
	},
});

const initializeIndex = async () => {
	// index = new Document({
	// 	document: {
	// 		id: "id",
	// 		index: ["content"],
	// 	},
	// });
	let content = await readFile();
	content = content.split("\n");
	content.forEach(async (val) => {
		const splitPos = val.indexOf(" ");
		await index.import(val.substr(0, splitPos), val.substr(splitPos + 1));
	});
	return index;
};

const exportIndex = async () => {
	await clearFile();
	index.export(function (key, data) {
		// you need to store both the key and the data!
		// e.g. use the key for the filename and save your data

		return new Promise(async function (resolve) {
			// do the saving as async
			await writeToFile(key + " " + (data !== undefined ? data : "") + "\n");
			resolve();
		});
	});
};

const addToIndex = async (doc) => {
	await index.addAsync({ id: doc.id, content: doc.content });
};

const searchIndex = async (query) => {
	const results = await index.searchAsync(query, { enrich: true });
	// const promises = [];
	// results[0].result.forEach(val => {
	// 	promises.push()
	// });

	// const searchResults = Promise.all(promises);
	return results;
};

module.exports = {
	addToIndex,
	searchIndex,
	exportIndex,
	initializeIndex,
};
