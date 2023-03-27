const { Document } = require("flexsearch");
const {
	clearFile,
	writeToFile,
	readFile,
	writeContentToJson,
	readContentFromJson,
} = require("./helper");
const fs = require("fs");

// TODO Flexsearch has persistence issues
// Temporarily solved using storing all documents and indexing again
// Shift to a new library
// Refer -https://github.com/nextapps-de/flexsearch/issues/358

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
	// let content = await readFile();
	// content = content.split("\n");
	// content.forEach(async (val) => {
	// 	const splitPos = val.indexOf(" ");
	// 	await index.import(
	// 		val.substr(0, splitPos),
	// 		val.substr(splitPos + 1) ?? null
	// 	);
	// });

	// Get all stored content and add them to index
	let data = await readContentFromJson();
	data = JSON.parse(data);
	const promises = [];
	data.forEach((doc) => {
		promises.push(index.addAsync({ id: doc.id, content: doc.content }));
	});
	await Promise.all(promises);
	return index;
};

const exportIndex = async () => {
	await clearFile();
	index.export(function (key, data) {
		// you need to store both the key and the data!
		// e.g. use the key for the filename and save your data
		console.log(key, data);
		return new Promise(async function (resolve) {
			// do the saving as async
			await writeToFile(key + " " + (data !== undefined ? data : "") + "\n");
			resolve();
		});
	});
};

const addToIndex = async (doc) => {
	await index.addAsync({ id: doc.id, content: doc.content });
	await writeContentToJson({ id: doc.id, content: doc.content });
};

const searchIndex = async (query) => {
	let results = await index.searchAsync(query, { enrich: true });
	// const promises = [];
	// results[0].result.forEach(val => {
	// 	promises.push()
	// });

	// const searchResults = Promise.all(promises);
	results = results?.[0]?.result.map((val) => val.doc.content.substr(0, 50));
	console.log(results);
	return results || [];
};

module.exports = {
	addToIndex,
	searchIndex,
	exportIndex,
	initializeIndex,
};
