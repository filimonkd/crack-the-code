import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameLobby from "./GameLobby";
import GamePlay from "./GamePlay";
import ResultScreen from "./ResultScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/game/:gameId" element={<GamePlay />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
