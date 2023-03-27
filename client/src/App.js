import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

function App() {
	return (
		<>
			<NavBar></NavBar>
			<Routes>
				<Route path="/" element={<HomePage></HomePage>}></Route>
				<Route path="/search" element={<SearchPage></SearchPage>}></Route>
			</Routes>
		</>
	);
}

export default App;
