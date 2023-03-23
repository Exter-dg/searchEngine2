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
const app = express();
const port = 4000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/tesseractjs", upload.single("file"), fileExtract);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
