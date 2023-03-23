const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, "uploads");
	},
	filename: (req, file, callBack) => {
		callBack(null, `${file.originalname}`);
	},
});
let upload = multer({
	storage: storage,
});

const { fileExtract } = require("./controllers/file");
const { pdfToImages } = require("./util/helper");
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/extractText", upload.single("file"), fileExtract);

app.post("/pdf", async (req, res) => {
	await pdfToImages("./uploads/pdf3page.pdf");
	res.send("hello world");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
