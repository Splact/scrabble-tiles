import * as CANNON from "cannon";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { useThree, useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { useDrag } from "react-use-gesture";

import { useConfig } from "utils/config";
import { useCannon } from "utils/useCannon";

const Tile = ({ color, renderOrder }) => {
  const position = useRef([0, 0, 0.5]);
  const rotation = useRef([0, 0, 0]);
  const { size, viewport } = useThree();
  // const [position, setPosition] = useState([0, 0, 5]);
  // const [quaternion, setQuaternion] = useState([0, 0, 0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const { color: defaultColor, size: tileSize, wireframe } = useConfig(
    c => c.tile
  );
  const aspect = size.width / viewport.width;

  const [spring, set] = useSpring(() => ({
    position: position.current,
    rotation: rotation.current,
    config: { mass: 1, friction: 100, tension: 320 }
  }));

  // const { ref, body } = useCannon(
  //   { bodyProps: { mass: 100000 } },
  //   body => {
  //     body.addShape(new CANNON.Box(new CANNON.Vec3(tileSize, tileSize, 1)));
  //     body.position.set(...position);
  //     body.quaternion.set(...quaternion);
  //   },
  //   []
  // );

  const bindDrag = useDrag(
    ({ offset: [x, y], first, last }) => {
      if (first) {
        setIsDragging(true);
        rotation.current = [
          Math.PI * (-0.05 + 0.1 * Math.random()),
          Math.PI * (-0.05 + 0.1 * Math.random()),
          0
        ];
      } else if (last) {
        setIsDragging(false);
        rotation.current = [0, 0, 0];
      }

      position.current = [
        (x / aspect) * 10,
        (-y / aspect) * 10,
        last ? 0.5 : 5
      ];

      console.log(position.current);

      set({
        position: position.current,
        rotation: rotation.current
      });
    },
    {
      eventOptions: { pointer: true }
    }
  );

  // const bindDrag = useDrag(
  //   ({ xy: [x, y], first, last }) => {
  //     if (first) {
  //       body.mass = 0;
  //       body.updateMassProperties();
  //     } else if (last) {
  //       body.mass = 10000;
  //       body.updateMassProperties();
  //     }

  //     body.position.set(
  //       (x - size.width / 2) / aspect,
  //       -(y - size.height / 2) / aspect,
  //       body.position.z
  //     );
  //   },
  //   {
  //     eventOptions: { pointer: true }
  //   }
  // );

  console.log(spring);

  // useFrame(() => {
  //   // Sync cannon body position if needed
  //   const deltaX = Math.abs(body.position.x - position[0]);
  //   const deltaY = Math.abs(body.position.y - position[1]);
  //   const deltaZ = Math.abs(body.position.z - position[2]);
  //   if (deltaX > 0.001 || deltaY > 0.001 || deltaZ > 0.001) {
  //     setPosition(body.position.clone().toArray());
  //   }

  //   // Sync cannon body rotation if needed
  //   const bodyQuaternion = body.quaternion.toArray();
  //   const quaternionDelta = bodyQuaternion
  //     .map((n, idx) => Math.abs(n - quaternion[idx]))
  //     .reduce((acc, curr) => acc + curr);
  //   if (quaternionDelta > 0.01) {
  //     setQuaternion(body.quaternion.toArray());
  //   }
  // });

  return (
    <a.mesh
      renderOrder={renderOrder}
      castShadow
      {...spring}
      {...bindDrag()}
      // ref={ref}
      // onPointerDown={handlePointerDown}
      // onPointerLeave={handlePointerUp}
      // onPointerUp={handlePointerUp}
    >
      <boxBufferGeometry attach="geometry" args={[tileSize, tileSize, 1]} />
      <meshPhongMaterial
        attach="material"
        emissive={wireframe ? "red" : color || defaultColor}
        emissiveIntensity={1}
        wireframe={wireframe}
      />
    </a.mesh>
  );
};

export default Tile;
