const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const { fileExtract } = require("./controllers/file");
const { pdfToImages } = require("./util/ocr");
const {
	addToIndex,
	searchIndex,
	exportIndex,
	initializeIndex,
} = require("./util/search");
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hello World2!");
});

app.post("/extractText", fileExtract);

app.post("/pdf", async (req, res) => {
	await pdfToImages("./uploads/pdf3page.pdf");
	res.send("hello world");
});

app.get("/initializeIndex", async (req, res) => {
	const index = await initializeIndex();
	res.send("index");
});

app.get("/exportIndex", async (req, res) => {
	await exportIndex();
	res.send("done");
});

app.post("/addToIndex", async (req, res) => {
	const doc = req.body;
	await addToIndex(doc);
	res.send("Added to index");
});

app.post("/searchIndex", async (req, res) => {
	const query = req.body.query;
	const results = await searchIndex(query);
	res.send(results);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	initializeIndex();
});

// TODO Implement a mechanism for graceful shutdown - to store index before exiting
