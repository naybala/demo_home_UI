"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useProgress,
} from "@react-three/drei";
import Model from "./Model";
import { Bounds } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p className="font-semibold text-lg">
          {progress.toFixed(0)}% Loading...
        </p>
      </div>
    </Html>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[80vh] bg-black">
      <Canvas camera={{ position: [8, 3, 8], fov: 45 }}>
        <ambientLight intensity={1} />

        <directionalLight position={[5, 5, 5]} />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <Model />
          </Bounds>
        </Suspense>

        <Environment preset="studio" />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
