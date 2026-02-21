"use client";

import * as THREE from "three";
import { Snowboard } from "@/components/Snowboard";
import { ContactShadows, Environment, Html } from "@react-three/drei";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Hotspot } from "./Hotspot";
import { WavyPaths } from "./WavyPaths";
import { useControls } from "leva";

const INITIAL_CAMERA_POSITION = [-2.5, 2.2, 3] as const;

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

export function InteractiveSnowboard() {

  return (
    <div className="absolute inset-0 flex items-center justify-center ">
      <Canvas
        className="min-h-[60rem] w-full bg"
        camera={{ position: INITIAL_CAMERA_POSITION, fov: 60, near: 0.001, far: 100000 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  const containerRef = useRef<THREE.Group>(null);
  const originRef = useRef<THREE.Group>(null);

  const [animating, setAnimating] = useState(false);
  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true,
  });

  const { camera } = useThree();

  useEffect(() => {
    if (!containerRef.current || !originRef.current) return;

    gsap.to(containerRef.current.position, {
      x: 0.5,
      rotateZ: Math.PI / 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(originRef.current.rotation, {
      y: Math.PI / 30,
      rotateZ: Math.PI / 60,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0));

    setZoom();

    window.addEventListener("resize", setZoom);

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);

      camera.position.x = INITIAL_CAMERA_POSITION[0] * scale;
      camera.position.y = INITIAL_CAMERA_POSITION[1] * scale;
      camera.position.z = INITIAL_CAMERA_POSITION[2] * scale;
    }

    return () => window.removeEventListener("resize", setZoom);
  }, [camera]);

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();

    const board = containerRef.current;
    const origin = originRef.current;

    if (!board || !origin || animating) return;

    const { name } = event.object;

    setShowHotspot((current) => ({ ...current, [name]: false }));

    // 单板滑雪动作
    if (name === "back") {
      carve(board); // 前压动作
    } else if (name === "middle") {
      turn(board); // 转弯动作
    } else if (name === "front") {
      jumpTrick(board, origin); // 小跳跃动作
    }
  }
  
  // 前压/后仰动作（Carve）
  function carve(board: THREE.Group) {
    jumpBoard(board);

    gsap.timeline()
      .to(board.rotation, { x: 0.5, duration: 0.3, ease: "power1.inOut" }) // 前倾压雪
      .to(board.rotation, { x: 0.2, duration: 0.3, ease: "power1.inOut" }) // 后仰
      .to(board.rotation, { x: 0, duration: 0.2, ease: "power1.out" }); // 回水平
  }

  // 左右小摆动，模拟转弯
  function turn(board: THREE.Group) {
    jumpBoard(board);

    gsap.timeline()
      .to(board.rotation, { x: -0.2, duration: 0.25, ease: "power1.inOut" }) // 前倾
      .to(board.rotation, { x: 0.2, duration: 0.25, ease: "power1.inOut" }) // 后仰
      .to(board.rotation, { z: 0.3, duration: 0.25, ease: "sine.inOut" }) // 向右转
      .to(board.rotation, { z: -0.3, duration: 0.25, ease: "sine.inOut" }) // 向左转
      .to(board.rotation, { z: 0, duration: 0.2, ease: "sine.inOut" }) // 回中
      .to(board.rotation, { x: 0, duration: 0.2, ease: "power1.out" }); // 回水平
  }

  // 小跳跃动作
  function jumpTrick(board: THREE.Group, origin: THREE.Group) {
    jumpBoard(board);

    gsap.timeline()
      .to(board.rotation, { x: -0.2, duration: 0.2, ease: "power1.inOut" }) // 前压
      .to(board.rotation, { x: 0.2, duration: 0.2, ease: "power1.inOut" }) // 后仰
      .to(
        origin.rotation,
        { y: `+=${Math.PI * 2}`, duration: 0.5, ease: "power1.inOut" }, // 小旋转
        0.1
      )
      .to(board.rotation, { x: 0, duration: 0.2, ease: "power1.out" });
  }

  // 跳跃辅助函数
  function jumpBoard(board: THREE.Group) {
    setAnimating(true);

    gsap.timeline({ onComplete: () => setAnimating(false) })
      .to(board.position, { y: 0.5, duration: 0.4, ease: "power2.out", delay: 0.1 })
      .to(board.position, { y: 0, duration: 0.4, ease: "power2.in" });
  }

  return (
    <group>
      <Environment preset="city" environmentIntensity={0.4} />
      
      
      {/* <Environment
        files={"/hdr/warehouse-512.hdr"}
        environmentIntensity={0.6}
      /> */}
      <group ref={originRef}>
        <group ref={containerRef} >
          <group position={[0, 0.12, 0]}>
            <Snowboard />

            <Hotspot
              isVisible={!animating && showHotspot.front}
              position={[0, 1, 1.4]}
              color="#B8FC39"
            />

            <mesh position={[0, 1, 1.3]} name="front" onClick={onClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={!animating && showHotspot.middle}
              position={[-0.3, 0.2, 0.2]}
              color="#FF7A51"
            />
            <mesh position={[-0.25, 0.33, 0.2]} name="middle" onClick={onClick}>
              <boxGeometry args={[0.6, 0.1, 1]} />
              <meshStandardMaterial visible={false} />
            </mesh>

            <Hotspot
              isVisible={!animating && showHotspot.back}
              position={[-2, 0.27, 0.1]}
              color="#46ACFA"
            />
            <mesh position={[-2, 0.27, 0.1]} name="back" onClick={onClick}>
              <boxGeometry args={[0.8, 0.2, 0.8]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, 0, 0]} />
      {/* <group
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.09, -0.5]}
        scale={[0.2, 0.2, 0.2]}
      >
        <Html
          wrapperClass="pointer-events-none"
          transform
          zIndexRange={[1,0]}
          occlude="blending"
        >
          <WavyPaths />
        </Html>
      </group> */}
    </group>
  );
}
