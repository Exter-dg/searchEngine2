import { Search } from "@mui/icons-material";
import {
	Box,
	Divider,
	InputAdornment,
	List,
	ListItemButton,
	ListItemText,
	TextField,
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
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary={result} />
								</ListItemButton>
								<Divider />
							</>
						))}
					</List>
				</Box>
			</Box>
		</Box>
	);
}
