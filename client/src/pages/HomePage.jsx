import {
	Button,
	Box,
	Grid,
	Typography,
	IconButton,
	Pagination,
	Divider,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Lottie from "lottie-react";
import loadingJson from "../assets/loading2.json";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

export default function HomePage() {
	const [file, setFile] = useState([]);
	const [fileData, setFileData] = useState([]);
	// TODO page now represents fileNo.
	const [page, setPage] = useState(0);
	const [isSearching, setIsSearching] = useState(false);

	const handleChange = (e) => {
		if (e.target.files[0] === undefined) return;
		console.log("File uploaded", e.target.files[0]);
		setFile((file) => [...file, e.target.files[0]]);
	};

	const handleSubmit = async () => {
		if (file.length === 0) return;
		setIsSearching(true);
		const promises = [];
		file.forEach((val) => {
			const data = new FormData();
			console.log("Val: ", val);
			data.append("file", val);
			promises.push(axios.post("http://localhost:4000/extractText", data));
		});
		const responses = await Promise.all(promises);
		responses.forEach((response) => {
			setFileData((fileData) => [...fileData, response.data.join(" ")]);
		});
		console.log(responses);
		setPage(0);
		setIsSearching(false);
	};

	const resetFile = () => {
		setFileData([]);
		setPage(0);
		setFile([]);
	};

	const handlePageChange = (e, page) => {
		setPage(page - 1);
	};

	const displayFileNames = () => {
		let str = file
			.slice(0, 3)
			.map((val) => val.name)
			.join(", ");
		if (file.length > 3)
			str +=
				" and " +
				(file.length - 3) +
				" more item" +
				(file.length === 4 ? "" : "s");
		return str;
	};

	return (
		<Box
			display="flex"
			justifyContent="end"
			flexDirection="column"
			alignItems="center"
			rowGap={4}
			minHeight="80vh"
			maxWidth="100%"
			sx={{
				marginTop: "4rem",
				padding: "3vh",
				paddingLeft: "20vh",
				paddingRight: "20vh",
			}}>
			<Grid
				container
				style={{ overflow: "clip" }}
				minHeight="65vh"
				maxHeight="65vh">
				<Grid item xs={12}>
					<Box
						style={{
							overflow: "scroll",
						}}
						sx={{
							width: "95%",
							boxShadow: 1,
							margin: "1vh",
							height: "55vh",
							padding: "3vh",
						}}>
						{isSearching ? (
							<Lottie
								loop
								animationData={loadingJson}
								play
								style={{
									width: 500,
									height: 300,
									marginLeft: "auto",
									marginRight: "auto",
								}}
							/>
						) : fileData.length > 0 ? (
							<Box>
								<Typography
									align="justify"
									variant="caption"
									color="text.secondary"
									sx={{ fontSize: "20px" }}>
									{file[page].name}
								</Typography>
								<Divider></Divider>
								<Typography
									align="justify"
									sx={{
										minHeight: "41vh",
										maxHeight: "41vh",
										mt: 2,
										mb: 2,
									}}>
									{fileData[page]}
								</Typography>
								<Box display="flex" justifyContent="center" alignItems="center">
									<Pagination
										count={file.length}
										onChange={handlePageChange}
										shape="rounded"
									/>
								</Box>
							</Box>
						) : (
							<Box
								sx={{ height: "100%" }}
								display="flex"
								justifyContent="center"
								flexDirection="column"
								alignItems="center">
								<input
									type="file"
									id="icon-button-file"
									hidden
									onChange={handleChange}
								/>
								<label htmlFor="icon-button-file">
									<IconButton
										color="#393e46"
										component="span"
										aria-label="add an alarm"
										sx={{
											mt: "2rem",
											border: "1px dashed #393e46",
											height: "10rem",
											width: "10rem",
										}}>
										<FolderOpenOutlinedIcon sx={{ fontSize: "5rem" }} />
									</IconButton>
								</label>
								<Typography variant="h6" color="text.secondary" m={2}>
									{file.length !== 0 ? displayFileNames() : "Upload your files"}
								</Typography>
							</Box>
						)}
					</Box>
				</Grid>
			</Grid>
			<Box
				display="flex"
				justifyContent="end"
				flexDirection="row-reverse"
				alignItems="start"
				columnGap={4}
				sx={{ width: "100%" }}>
				<Button
					variant="contained"
					classes={"primary-button"}
					sx={{
						backgroundColor: "#f96d00",
						width: "12rem",
						"&:hover": {
							backgroundColor: "#f96d00",
							opacity: [0.9, 0.8, 0.7],
						},
					}}
					component="label"
					disabled={fileData.length > 0}
					onClick={handleSubmit}>
					Submit
				</Button>
				{/* <Typography variant="caption" color="text.secondary" mt={1}>
					or
				</Typography> */}
				<Button
					variant="outlined"
					onClick={resetFile}
					sx={{
						width: "12rem",
						color: "#393e46",
						borderColor: "#393e46",
						"&:hover": {
							opacity: [0.9, 0.8, 0.7],
							backgroundColor: "white",
							color: "#393e46",
							borderColor: "#393e46",
						},
					}}>
					Reset
				</Button>
			</Box>
		</Box>
	);
}
