const { createWorker, createScheduler } = require("tesseract.js");
// Has 2 external Dependencies - graphicsmagick and ghostscript
const { fromPath } = require("pdf2pic");
const sharp = require("sharp");
const uuid4 = require("uuid4");
const { addToIndex } = require("./search");

const processPdf = async (path) => {
	let pdfBufArr = await pdfToImages(path);
	pdfBufArr = await processImage(pdfBufArr);
	const scheduler = await createTesseractScheduler(3);

	const result = [];
	pdfBufArr.forEach((val) => {
		result.push(
			scheduler.addJob(
				"recognize",
				val,
				{ rotateAuto: true },
				{ imageColor: true, imageGrey: true, imageBinary: true }
			)
		);
	});

	let data = await Promise.all(result);
	await terminateTesseractScheduler(scheduler);

	data = data.map((val) => {
		let text = "";
		val.data.words.forEach((word) => {
			console.log(word.choices);
			text += word.choices[0].confidence > 65 ? word.choices[0].text + " " : "";
		});

		return text;
	});
	console.log("Data: ", data);

	// Store data in index
	addToIndex({ id: uuid4(), content: data });

	return data;
};

const processImage = async (pdfBufArr) => {
	const promises = [];
	pdfBufArr.forEach(async (inputBuffer) => {
		promises.push(
			sharp(inputBuffer)
				.rotate()
				.grayscale()
				// Tesseract expects this to be removed
				.removeAlpha()
				// .blur()
				.sharpen({ sigma: 20 })
				.flatten()
				.normalize()
				// .negate()
				.median()
				.threshold()
				.toBuffer()
		);
		// await sharp(inputBuffer).toFile("original.png");
		// await sharp(inputBuffer)
		// 	.rotate()
		// 	.grayscale()
		// 	.removeAlpha()
		// 	// .blur()
		// 	.sharpen({ sigma: 20 })
		// 	.flatten()
		// 	.normalize()
		// 	// .negate()
		// 	.median()
		// 	.threshold()
		// 	.toFile("output.png");
	});
	const result = await Promise.all(promises);
	console.log("Processed buffers: ", result);
	return result;
};

const createTesseractScheduler = async (concurrency) => {
	const scheduler = createScheduler();
	const resArr = Array(concurrency);
	for (let i = 0; i < concurrency; i++) {
		resArr[i] = createTesseractWorker(scheduler, "eng");
	}
	await Promise.all(resArr);
	return scheduler;
};

const terminateTesseractScheduler = async (scheduler) => {
	await scheduler.terminate();
};

const createTesseractWorker = async (scheduler, lang) => {
	const worker = await createWorker({ cachePath: "." });
	// Use english as primary language and hindi as secondary
	// https://tesseract-ocr.github.io/tessdoc/Command-Line-Usage.html
	// eng+hin for primary secondary language
	await worker.loadLanguage("eng");
	await worker.initialize("eng");
	await worker.setParameters({
		tessedit_ocr_engine_mode: "OEM_LSTM_ONLY",
		PageIteratorLevel: "RIL_WORD",
		user_defined_dpi: "2000",

		// Disable dictionary words - increases accuracy
		// https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html
		load_system_dawg: false,
		load_freq_dawg: false,
	});
	scheduler.addWorker(worker);
};

const pdfToImages = async (path) => {
	const options = {
		// Increasing density helps in accuracy -
		// Density is the DPI of image generated
		// https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html
		density: 2000,
		saveFilename: "untitled2",
		savePath: "./images",
		format: "png",
		width: 2380,
		height: 3368,
	};

	// Convert all pages of the pdf to base64 string
	const pdfBase64Arr = await fromPath(path, options).bulk(-1, true);

	// Convert base64 string to buffer
	const pdfBufArr = pdfBase64Arr.map((val) => {
		return Buffer.from(val.base64, "base64");
	});
	return pdfBufArr;
};

module.exports = {
	processPdf,
};
