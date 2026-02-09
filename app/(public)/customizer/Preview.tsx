"use client";

import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useCustomizerControls } from "./context";
import { Snowboard } from "@/components/Snowboard";

const ENVIRONMENT_COLOR = "#3B3A3A";

type Props = {
  // wheelTextureURLs: string[];
  // deckTextureURLs: string[];
};

export default function Preview({ }: Props) {
  const cameraControls = useRef<CameraControls>(null);
  const floorRef = useRef<THREE.Mesh>(null);

  const { selectedBoard, selectedBase } = useCustomizerControls();

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.8, 0)
    );
  }, [selectedBoard]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, -0.3, 0),
      new THREE.Vector3(0, -1.5, 0)
    );
  }, [selectedBase]);

  function setCameraControls(target: THREE.Vector3, pos: THREE.Vector3) {
    if (!cameraControls.current) return;

    cameraControls.current.setTarget(target.x, target.y, target.z, true);
    cameraControls.current.setPosition(pos.x, pos.y, pos.z, true);
  }

  function onCameraControlStart() {
    if (
      !cameraControls.current ||
      !floorRef.current ||
      cameraControls.current.colliderMeshes.length > 0
    )
      return;

    cameraControls.current.colliderMeshes = [floorRef.current];
  }

  return (
    <Canvas camera={{ position: [2.5, 1, 0], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 10]} />
        <color attach="background" args={[ENVIRONMENT_COLOR]} />
        {/* <StageFloor /> */}

        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} ref={floorRef}>
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial visible={false} />
        </mesh> */}

        <Snowboard
          topTexture={selectedBoard?.texture.url}
          bottomColor={selectedBase?.color}
          sideColor="#000000"
          rotation={[-Math.PI / 2, 0, 0]} // Rotate to stand up or lay flat as needed.  Standard is flat usually? Let's check rotation. Existing was group pos.
        // The skateboard was likely flat.  Let's keep it somewhat similar but check model orientation.
        // Snowboard.jsx applies existing rotation? No. It has group wrapper.
        // Let's reset rotation here to defaults and rely on Camera.
        />
        <CameraControls
          ref={cameraControls}
          minDistance={0.2}
          maxDistance={4}
          onStart={onCameraControlStart}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    color: ENVIRONMENT_COLOR,
    normalMap: normalMap,
  });

  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}
