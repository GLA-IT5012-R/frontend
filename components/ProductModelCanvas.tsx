'use client'

interface ProductModelInnerProps {
    textureUrls: string[] | undefined
    variant: string
}

import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { clsx } from 'clsx'
import type { ProductModelProps } from '@/models/Product'

export function ProductModelCanvas({
    orbitControls = true,
    type,
    typeId,
    name,
    textureUrls,
    variant = 'camber',
    className,
    style,
}: any): React.ReactElement {
    return (
        <div style={style} className={clsx("bg-transparent", className)}>
            <Canvas style={{ width: '100%', height: '100%' }}
                camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={2.5} />
                <directionalLight position={[0, 5, 6]} intensity={5} color={'#ccc'}/>
                <Suspense fallback={null}>
                    <ProductModel
                        textureUrls={textureUrls}
                        variant={variant}
                    />
                    {/* <Environment preset="sunset" /> */}
                </Suspense>
                <OrbitControls enabled={orbitControls} />
            </Canvas>
        </div>
    )
}


export function ProductModel({ textureUrls, variant }: ProductModelInnerProps) {
    const { nodes, materials } = useGLTF('/models/snowboard.glb')

    // 根据 textureUrls 动态生成 texture
    const textures = useTexture(textureUrls || [])

    // 可选：统一贴图参数
    textures.forEach((tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.flipY = false
        tex.needsUpdate = true
    })

    // 选择 mesh 组
    const groupNodes = useMemo(() => {
        switch (variant) {
            case 'camber':
                return [
                    nodes.snowboard_camber_1,
                    nodes.snowboard_camber_2,
                    nodes.snowboard_camber_3,
                    nodes.snowboard_camber_4,
                ]
            case 'flat':
                return [
                    nodes.snowboard_flat_1,
                    nodes.snowboard_flat_2,
                    nodes.snowboard_flat_3,
                    nodes.snowboard_flat_4,
                ]
            case 'rocker':
                return [
                    nodes.snowboard_rocker_1,
                    nodes.snowboard_rocker_2,
                    nodes.snowboard_rocker_3,
                    nodes.snowboard_rocker_4,
                ]
            default:
                return []
        }
    }, [variant, nodes])

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
                    >
                        <meshStandardMaterial
                            map={map}
                            roughness={0.2}
                            metalness={0.5}
                        />
                    </mesh>
                )
            })}
        </group>
    )
}

useGLTF.preload('/models/snowboard.glb')
