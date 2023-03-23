import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Box from "@mui/material/Box";

function App() {
	return (
		<>
			<NavBar></NavBar>
			<Box sx={{ marginTop: "4rem" }}>
				<HomePage></HomePage>
			</Box>
		</>
	);
}

export default App;
