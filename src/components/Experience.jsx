import React, { useRef,useMemo } from 'react'
import { extend, useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'


import { shaderMaterial, useTexture, OrbitControls } from '@react-three/drei';

import { useControls } from 'leva'
import * as THREE from 'three'

import vertexShader from '../shaders/particles/vertex.glsl'
import fragmentShader from '../shaders/particles/fragment.glsl'

const Experience = () => {
    const particlesRef = useRef()



    // const sphereRef = useRef()

        // Create particles geometry - using PlaneGeometry
    // This creates a 32x32 grid = 1,024 vertices arranged in a plane.
    // This geometry is parsed as [x,y] coordinates, that build  our points.
    // Create particles geometry
    const particlesGeometry = useMemo(() => {
        const geometry = new THREE.SphereGeometry(3)

        return geometry
    }, [])


    const MyShaderMaterial = shaderMaterial({
        uResolution: new THREE.Vector2(100, 100),
        uSize: 2.4,


    },
        vertexShader,
        fragmentShader
    )
    //this exent allows it to be used a a component below
    // Note: When using "extend" which register custom components with the JSX reconciler, 
    // use lowercase names for those components, regardless of how they are initially defined.
    extend({ MyShaderMaterial: MyShaderMaterial })

    useFrame((state, delta) => {

        const elapsedTime = state.clock.elapsedTime

        // sphereRef.current.rotation.x = - elapsedTime * 0.1
        // particlesRef.current.rotation.y = elapsedTime * 0.5


        // state.camera.lookAt(0, 0, 0);
    })

    return (<>
        <OrbitControls makeDefault />
        {/* Sets background */}
        <color args={['#1d1f2a']} attach='background' />

        {/* <mesh
            ref={sphereRef}
            position={[0, 0, 0]}
        >
            <sphereGeometry args={[2, 64, 64]} />
            <myShaderMaterial transparent side={THREE.DoubleSide} />
        </mesh> */}


        {/* Points using PlaneGeometry */}
        <points ref={particlesRef} geometry={particlesGeometry}>
            <myShaderMaterial />
        </points>


    </>
    )
}

export default Experience