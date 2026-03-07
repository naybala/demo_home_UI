"use client";

import { useGLTF } from "@react-three/drei";

export default function WatchModel() {
  const MODEL_PATH = "/models/cartoon_car.glb";
  const { scene } = useGLTF(MODEL_PATH);
  return <primitive object={scene} scale={2} position={[0, -1.5, 0]} />;
}
