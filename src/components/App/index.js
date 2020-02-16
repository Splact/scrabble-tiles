import React from "react";

import Board from "components/Board";
import Tile from "components/Tile";
import World from "components/World";

import { DatGui } from "utils/config";
import { isDevelopment } from "utils/isEnvironment";

import "./App.css";

function App() {
  return (
    <div className="App">
      <World>
        {/* TODO: Place tiles */}
        <Tile />

        <Board />
      </World>

      {isDevelopment && <DatGui />}
    </div>
  );
}

export default App;
