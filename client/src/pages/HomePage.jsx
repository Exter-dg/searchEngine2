import { Button, Box } from "@mui/material";
import axios from "axios";

export default function HomePage() {
	const handleChange = async (e) => {
		console.log("File uploaded", e.target.files[0]);
		const data = new FormData();
		data.append("file", e.target.files[0]);
		await axios.post("http://localhost:4000/tesseractjs", data);
	};
	return (
		<div>
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
				rowGap={4}
				minHeight="100vh">
				<Button
					variant="contained"
					sx={{ backgroundColor: "darkslategray" }}
					component="label">
					Upload File
					<input type="file" hidden onChange={handleChange} />
				</Button>
			</Box>
		</div>
	);
}
