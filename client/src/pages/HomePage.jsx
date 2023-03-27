import { Button, Box, Grid, Typography, IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Lottie from "lottie-react";
import loadingJson from "../assets/loading2.json";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

export default function HomePage() {
	const [file, setFile] = useState(undefined);
	const [fileData, setFileData] = useState([]);
	const [page, setPage] = useState(0);
	const [isSearching, setIsSearching] = useState(false);

	const handleChange = (e) => {
		console.log("File uploaded", e.target.files[0]);
		setFile(e.target.files[0]);
	};

	const handleSubmit = async () => {
		if (file === undefined) return;
		setIsSearching(true);
		const data = new FormData();
		data.append("file", file);
		const response = await axios.post(
			"http://localhost:4000/extractText",
			data
		);
		setFileData(response.data);
		setPage(0);
		setIsSearching(false);
	};

	const resetFile = () => {
		setFileData([]);
		setPage(0);
		setFile(undefined);
	};

	const toggleNextPage = () => {
		if (page === fileData.length - 1) return;
		setPage((page) => page + 1);
	};

	const togglePrevPage = () => {
		if (page === 0) return;
		setPage((page) => page - 1);
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
				paddingLeft: "13vh",
				paddingRight: "13vh",
			}}>
			<Grid
				container
				style={{ overflow: "clip" }}
				minHeight="40vh"
				maxHeight="65vh">
				<Grid item xs={12}>
					<Box sx={{ boxShadow: 1, margin: "1vh", height: "63vh" }}>
						<Box
							style={{
								height: "41vh",
								overflow: "scroll",
							}}
							sx={{
								width: "96%",
								padding: "3vh",
							}}>
							{isSearching ? (
								<Lottie
									loop
									animationData={loadingJson}
									play
									style={{
										width: 500,
										height: 400,
										marginLeft: "auto",
										marginRight: "auto",
									}}
								/>
							) : fileData.length > 0 ? (
								<Typography align="justify">{fileData[page]}</Typography>
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
												mt: "6rem",
												border: "1px dashed grey",
												height: "10rem",
												width: "10rem",
											}}>
											<FolderOpenOutlinedIcon sx={{ fontSize: "5rem" }} />
										</IconButton>
									</label>
									<Typography variant="h6" color="text.secondary" m={2}>
										Upload your file
									</Typography>
								</Box>
							)}
						</Box>
						{fileData.length > 0 ? (
							<Box
								sx={{
									padding: "1vh",
								}}
								display="flex"
								justifyContent="center"
								flexDirection="column"
								alignItems="center"
								columnGap={1}>
								<Box
									sx={{
										padding: "3vh",
									}}
									display="flex"
									justifyContent="center"
									flexDirection="row"
									alignItems="center"
									columnGap={1}>
									<Button
										width="10%"
										variant="contained"
										sx={{
											backgroundColor: "#393e46",
											width: "7rem",
											"&:hover": {
												backgroundColor: "#393e46",
												opacity: [0.9, 0.8, 0.7],
											},
										}}
										component="label"
										onClick={togglePrevPage}>
										Previous
									</Button>
									<Button
										variant="contained"
										sx={{
											backgroundColor: "#393e46",
											width: "7rem",
											"&:hover": {
												backgroundColor: "#393e46",
												opacity: [0.9, 0.8, 0.7],
											},
										}}
										component="label"
										onClick={toggleNextPage}>
										Next
									</Button>
								</Box>
								{`Page ${page + 1} of ${fileData.length}`}
							</Box>
						) : (
							""
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
