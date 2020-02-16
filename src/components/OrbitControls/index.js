import React, { useRef } from "react";
import { useThree, extend } from "react-three-fiber";
import { OrbitControls as THREEOrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls: THREEOrbitControls });

const OrbitControls = () => {
  const { camera, gl } = useThree();
  const ref = useRef(null);

  return <orbitControls ref={ref} args={[camera, gl.domElement]} />;
};

export default OrbitControls;
