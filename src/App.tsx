import GamePage from "./pages/GamePage";
import MenuPage from "./pages/MenuPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
