import React from "react";
import ReactDatGui, {
  DatFolder,
  DatNumber,
  DatColor,
  DatBoolean
} from "react-dat-gui";
import "react-dat-gui/dist/index.css";
import create from "zustand";

export const [useConfig] = create(set => ({
  board: {
    color: "#7F86BF",
    size: 100,
    wireframe: false
  },
  tile: {
    color: "#FFFFFF",
    size: 5,
    wireframe: false
  },
  world: {
    color: "#FBFAF6"
  },
  isOrbitControlEnabled: false,
  set
}));

export const DatGui = () => {
  const data = useConfig();
  const handleUpdate = useConfig(config => config.set);

  return (
    <ReactDatGui data={data} onUpdate={handleUpdate}>
      <DatFolder title="Board">
        <DatColor path="board.color" label="Color" />
        <DatNumber
          path="board.size"
          label="Size"
          min={10}
          max={1000}
          step={1}
        />
        <DatBoolean path="board.wireframe" label="Wireframe" />
      </DatFolder>

      <DatFolder title="Tile">
        <DatColor path="tile.color" label="Color" />
        <DatNumber path="tile.size" label="Size" min={10} max={1000} step={1} />
        <DatBoolean path="tile.wireframe" label="Wireframe" />
      </DatFolder>

      <DatFolder title="World">
        <DatColor path="world.color" label="Color" />
      </DatFolder>

      <DatBoolean path="isOrbitControlEnabled" label="Orbit Control" />
    </ReactDatGui>
  );
};
