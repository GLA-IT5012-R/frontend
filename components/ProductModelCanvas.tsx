'use client'

interface ProductModelInnerProps {
    textureUrls: string[] | undefined
    typeId: string
}

import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { clsx } from 'clsx'
const FINISH_OPTIONS = {
    matte: {
        roughness: 0.5,
        metalness: 0.2,
    },
    glossy: {
        roughness: 0.3,
        metalness: 0.2,
    },
}
export function ProductModelCanvas({
    position = [0, 0, 5],
    orbitControls = true,
    typeId,
    textureUrls,
    className,
    style,
    ...data
}: any): React.ReactElement {
    return (
        <div style={style} className={clsx("bg-transparent", className)}>
            <Canvas style={{ width: '100%', height: '100%' }}
                camera={{ position: position, fov: 55 }}>
                <Suspense fallback={null}>
                    {/* <Environment preset="city" /> */}
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
                    
                    {/* Model */}
                    <ProductModel
                        typeId={typeId}
                        textureUrls={textureUrls}
                    />
                </Suspense>
                <OrbitControls enabled={orbitControls} />
            </Canvas>
        </div>
    )
}


export function ProductModel({ textureUrls, typeId }: ProductModelInnerProps) {
    const { nodes, materials } = useGLTF('/models/snowboard.glb')

    // 根据 textureUrls 动态生成 texture
    const textures = useTexture(textureUrls || [])
    console.log(textureUrls, typeId)
    // 可选：统一贴图参数
    textures.forEach((tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.flipY = false
        tex.needsUpdate = true
        tex.flipY = false; // Adjust if your texture appears upside down
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
        tex.anisotropy = 16;
    })
    const material = new THREE.MeshStandardMaterial({
        map: textures[0] || null,
        ...FINISH_OPTIONS.glossy
    })
    // 选择 mesh 组
    const groupNodes = useMemo(() => {
        switch (typeId) {
            case 'SB-001':
                return [
                    nodes.snowboard_camber_1,
                    nodes.snowboard_camber_2,
                    nodes.snowboard_camber_3,
                    nodes.snowboard_camber_4,
                ]
            case 'SB-002':
                return [
                    nodes.snowboard_flat_1,
                    nodes.snowboard_flat_2,
                    nodes.snowboard_flat_3,
                    nodes.snowboard_flat_4,
                ]
            case 'SB-003':
                return [
                    nodes.snowboard_rocker_1,
                    nodes.snowboard_rocker_2,
                    nodes.snowboard_rocker_3,
                    nodes.snowboard_rocker_4,
                ]
            default:
                return []
        }
    }, [typeId, nodes])

    // 返回 mesh 列表
    return (
        <group position={[0, 0, 0]} rotation={[0, -Math.PI / 2, Math.PI / 2]}>
            {/* <mesh rotateX={Math.PI / 2}>
                <planeGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textures[0]} />
            </mesh> */}
            {groupNodes.map((meshNode, idx) => {

                // 对应顺序替换贴
                if (!meshNode) return null
                const map = textures[0] || null
                return (
                    <mesh
                        key={meshNode.name}
                        geometry={meshNode.geometry}
                        material={material}
                    >
                    </mesh>
                )
            })}
        </group>
    )
}

useGLTF.preload('/models/snowboard.glb')
