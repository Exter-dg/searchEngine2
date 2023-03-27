import { Search } from "@mui/icons-material";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Divider,
	InputAdornment,
	List,
	ListItemButton,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const [debouncedQuery] = useDebounce(query, 500);
	const [results, setResults] = useState([]);

	useEffect(() => {
		console.log(debouncedQuery);
		async function fetchResults() {
			const response = await axios.post("http://localhost:4000/searchIndex", {
				query: debouncedQuery,
			});
			setResults(response.data);
		}
		fetchResults();
	}, [debouncedQuery]);

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	return (
		<Box
			sx={{
				width: "100vw",
				height: "85vh",
				marginTop: "5vh",
				bgcolor: "white",
				overflow: "clip",
			}}>
			<Box
				sx={{
					height: "75vh",
					margin: "2rem",
					marginTop: "6rem",
					boxShadow: 1,
					textAlign: "center",
					padding: "1rem",
				}}>
				<TextField
					id="input-with-icon-textfield"
					fullWidth
					placeholder="Type to start searching"
					value={query}
					onChange={handleChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						),
					}}
					variant="standard"
				/>
				<Box
					sx={{
						maxHeight: "86%",
						overflow: "scroll",
						marginTop: "4vh",
					}}>
					<List>
						{results.map((result) => (
							<>
								<ListItemButton sx={{ p: 0 }}>
									<Card
										variant="outlined"
										sx={{
											width: "100%",
										}}>
										<CardActionArea>
											<CardContent>
												<Typography
													sx={{ fontSize: 14 }}
													align="right"
													color="text.secondary"
													gutterBottom>
													{result.date}
												</Typography>
												<Typography variant="h5" component="div" align="left">
													{result.name}
												</Typography>
												<Typography
													sx={{ mb: 1.5, fontSize: 14 }}
													color="text.secondary"
													align="left">
													Name | Aadhar Number
												</Typography>
												<Typography variant="body2" align="left">
													{result.content}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</ListItemButton>
							</>
						))}
					</List>
				</Box>
			</Box>
		</Box>
	);
}
