import { Button, Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function HomePage() {
	const [file, setFile] = useState(undefined);
	const [fileData, setFileData] = useState([]);
	const [page, setPage] = useState(0);

	const handleChange = (e) => {
		console.log("File uploaded", e.target.files[0]);
		setFile(e.target.files[0]);
	};

	const handleSubmit = async () => {
		console.log("Button clicked");
		const data = new FormData();
		data.append("file", file);
		const response = await axios.post(
			"http://localhost:4000/extractText",
			data
		);
		console.log(response.data);
		setFileData(response.data);
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
			sx={{ marginTop: "4rem", padding: "3vh" }}>
			<Grid
				container
				style={{ overflow: "auto" }}
				minHeight="40vh"
				maxHeight="65vh">
				<Grid item xs={12}>
					<Box sx={{ boxShadow: 3, margin: "1vh" }}>
						<Box
							style={{
								height: "38vh",
								overflow: "auto",
							}}
							sx={{
								width: "95%",
								padding: "3vh",
							}}>
							<Typography align="justify">
								{fileData.length > 0
									? fileData[page]
									: "Upload file to see results"}
							</Typography>
						</Box>
						<Box
							sx={{
								padding: "3vh",
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
							{fileData.length > 0
								? `Page ${page + 1} of ${fileData.length}`
								: ""}
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Button
				variant="contained"
				sx={{
					backgroundColor: "#393e46",
					width: "8rem",
					"&:hover": {
						backgroundColor: "#393e46",
						opacity: [0.9, 0.8, 0.7],
					},
				}}
				component="label">
				Upload File
				<input type="file" hidden onChange={handleChange} />
			</Button>
			<Button
				variant="contained"
				classes={"primary-button"}
				sx={{
					backgroundColor: "#f96d00",
					width: "8rem",
					"&:hover": {
						backgroundColor: "#f96d00",
						opacity: [0.9, 0.8, 0.7],
					},
				}}
				component="label"
				onClick={handleSubmit}>
				Submit
			</Button>
		</Box>
	);
}
