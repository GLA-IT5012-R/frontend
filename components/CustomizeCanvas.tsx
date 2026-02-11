'use client'

import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { clsx } from 'clsx'
import { Decal } from '@react-three/drei'

const ENVIRONMENT_COLOR = "#969696"

const FINISH_OPTIONS: Record<string, { roughness: number; metalness: number }> = {
    matte: { roughness: 0.5, metalness: 0.2 },
    glossy: { roughness: 0.3, metalness: 0.2 },
}

interface CustomizerCanvasProps {
    typeId: string
    textureUrls: string[] | undefined
    finish?: string
    position?: [number, number, number]
    orbitControls?: boolean
    className?: string
    style?: React.CSSProperties
}

export function CustomizerCanvas({
    position = [2, 3, 4],
    orbitControls = true,
    typeId,
    textureUrls,
    finish = 'matte',
    className,
    style,
}: CustomizerCanvasProps) {

    return (
        <div style={style} className={clsx("bg-transparent", className)}>
            <Canvas shadows camera={{ position, fov: 55 }} style={{ width: '100%', height: '100%' }}>
                <Suspense fallback={null}>
                    <Environment files="/hdr/warehouse-512.hdr" environmentIntensity={0.6} />

                    <directionalLight
                        castShadow
                        position={[2, 5, 2]}
                        intensity={1.5}
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />

                    <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 30]} />
                    <color attach="background" args={[ENVIRONMENT_COLOR]} />

                    {/* FLOOR */}
                    <StageFloor />

                    {/* MODEL */}
                    <ProductModel
                        typeId={typeId}
                        textureUrls={textureUrls}
                        finish={finish}
                    />
                </Suspense>

                {/* CONTROL */}
                <OrbitControls
                    enabled={orbitControls}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2.2}
                />
            </Canvas>
        </div>
    )
}

interface ProductModelProps {
    textureUrls: string[] | undefined
    typeId: string
    finish?: string
}

export function ProductModel({ textureUrls, typeId, finish = 'matte' }: ProductModelProps) {
    const { nodes } = useGLTF('/models/snowboard002.glb') as any
    const test_texture = useTexture("/textures/TX004.png")
    test_texture.colorSpace = THREE.SRGBColorSpace
    test_texture.flipY = false
    test_texture.wrapS = THREE.RepeatWrapping
    test_texture.wrapT = THREE.RepeatWrapping
    test_texture.repeat.set(1, 1)
    test_texture.anisotropy = 16
    test_texture.needsUpdate = true


    // 加载纹理
    const textures = useTexture(textureUrls || [])
    textures.forEach((tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.flipY = false
        tex.wrapS = THREE.RepeatWrapping
        tex.wrapT = THREE.RepeatWrapping
        tex.repeat.set(1, 1)
        tex.anisotropy = 16
        tex.needsUpdate = true
    })

    // 动态材质
    const baseMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            ...(FINISH_OPTIONS[finish] || FINISH_OPTIONS.matte),
            map: textures[0] || null,
        })
    }, [finish, textures])

    const testMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            ...(FINISH_OPTIONS[finish] || FINISH_OPTIONS.matte),
            map: test_texture,
        })
    }, [finish, test_texture])


    // mesh 切换逻辑
    const groupNodes = useMemo(() => {
        switch (typeId) {
            case 'SB-001': return [nodes.snowboard_camber_1, nodes.snowboard_camber_2, nodes.snowboard_camber_3, nodes.snowboard_camber_4]
            case 'SB-002': return [nodes.snowboard_flat_1, nodes.snowboard_flat_2, nodes.snowboard_flat_3, nodes.snowboard_flat_4]
            case 'SB-003': return [nodes.snowboard_rocker_1, nodes.snowboard_rocker_2, nodes.snowboard_rocker_3, nodes.snowboard_rocker_4]
            default: return []
        }
    }, [typeId, nodes])

    return (
        <group position={[0, 0.465, 0]} rotation={[Math.PI / 3, 0, 0]}>
            {groupNodes.map((meshNode) => {
                if (!meshNode) return null

                const useTestTexture = meshNode.name.endsWith('_1')
                return (

                    <mesh
                        key={meshNode.name}
                        geometry={meshNode.geometry}
                        material={useTestTexture ? testMaterial : baseMaterial}
                        castShadow
                        receiveShadow
                    />
                )
            })}
        </group>
    )
}

useGLTF.preload('/models/snowboard.glb')

// FLOOR
function StageFloor() {
    const normalMap = useTexture("/concrete-normal.avif")
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
    normalMap.repeat.set(30, 30)
    normalMap.anisotropy = 8

    const material = new THREE.MeshStandardMaterial({
        roughness: 0.75,
        color: ENVIRONMENT_COLOR,
        normalMap,
    })

    return (
        <mesh
            receiveShadow
            position={[0, -0.005, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={material}
        >
            <circleGeometry args={[20, 32]} />
        </mesh>
    )
}
