import * as CANNON from "cannon";
import React from "react";

import { useConfig } from "utils/config";
import { useCannon } from "utils/useCannon";

const Board = ({ color, renderOrder }) => {
  const { color: defaultColor, size, wireframe } = useConfig(c => c.board);

  const { ref } = useCannon({ bodyProps: { mass: 0 } }, body => {
    body.addShape(new CANNON.Plane());
    body.position.set(0, 0, 0);
  });

  return (
    <mesh
      ref={ref}
      renderOrder={renderOrder}
      position={[0, 0, -0.5]}
      rotation={[0, 0, 0]}
      receiveShadow
    >
      <boxBufferGeometry attach="geometry" args={[size, size, 1]} />
      <meshPhongMaterial
        attach="material"
        emissive={wireframe ? "red" : color || defaultColor}
        emissiveIntensity={1}
        wireframe={wireframe}
      />
    </mesh>
  );
};

export default Board;
