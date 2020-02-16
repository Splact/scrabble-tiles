import { useEffect } from "react";
import { useThree } from "react-three-fiber";

const ClearColor = ({ color }) => {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(color);
  }, [color, gl]);

  return null;
};

export default ClearColor;
