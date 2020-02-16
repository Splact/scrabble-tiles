import React, { useCallback } from "react";
import { Canvas } from "react-three-fiber";

import ClearColor from "components/ClearColor";
import Stats from "components/Stats";
import OrbitControls from "components/OrbitControls";

import { isDevelopment } from "utils/isEnvironment";
import { useConfig } from "utils/config";
import { Provider as CannonProvider } from "utils/useCannon";

import { Vector3 } from "three";

const cameraSettings = {
  near: 0.001,
  far: 1000,
  fov: 70
};

const World = ({ children, fog }) => {
  const { color: backgroundColor } = useConfig(c => c.world);
  const isOrbitControlEnabled = useConfig(c => c.isOrbitControlEnabled);

  const handleCanvasCreate = useCallback(({ camera }) => {
    camera.position.y = -10;
    camera.position.z = 50;
    camera.lookAt(new Vector3(0, 0, 0));
    camera.updateMatrix();
  }, []);

  return (
    <Canvas
      camera={cameraSettings}
      onCreated={handleCanvasCreate}
      pixelRatio={window.devicePixelRatio}
      updateDefaultCamera
    >
      <ClearColor color={backgroundColor} />
      {fog && <fog attach="fog" args={[backgroundColor, 50, 250]} />}
      <ambientLight intensity={0.25} castShadow />

      <CannonProvider>{children}</CannonProvider>

      {isOrbitControlEnabled && <OrbitControls />}
      {isDevelopment && <Stats />}
    </Canvas>
  );
};

export default World;
