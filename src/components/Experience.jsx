import React, { useRef, useMemo } from 'react'
import { extend, useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'


import { shaderMaterial, useTexture, OrbitControls } from '@react-three/drei';

import { useControls } from 'leva'
import * as THREE from 'three'

import vertexShader from '../shaders/particles/vertex.glsl'
import fragmentShader from '../shaders/particles/fragment.glsl'

import Models from './Models.jsx';

const Experience = () => {
    let direction = 1
    const particlesRef = useRef()

    const myShaderMaterialRef = useRef()





    // Create particles geometry - using PlaneGeometry
    // This creates a 32x32 grid = 1,024 vertices arranged in a plane.
    // This geometry is parsed as [x,y] coordinates, that build  our points.
    // Create particles geometry
    const particlesGeometry = useMemo(() => {
        const geometry = new THREE.SphereGeometry(3)
        geometry.setIndex(null) // this is an optimisation - essentially duplicate vertices are being drawn at each vertex we draw a triangle (up to 6, this is a strange behaviour due to using a plane geometry to populate our points)
        geometry.deleteAttribute('normal') // this is an optimisation - we don't need normals for points

        return geometry
    }, [])

    let getProgress = () => {
        return progress
    }


    let { bgColor, holoColor, progress } = useControls({
        bgColor: { value: '#1d1f2a', label: 'Background Color' },
        holoColor: { value: '#0070ff', label: 'holo Color' },
        progress: { value: 0.0, min: 0.0, max: 1.0, step: 0.01 },

    });




    const MyShaderMaterial = shaderMaterial({
        uResolution: new THREE.Vector2(100, 100),
        uSize: 2.4,
        uProgress: progress,


    },
        vertexShader,
        fragmentShader,
    )

    //this exent allows it to be used a a component below
    // Note: When using "extend" which register custom components with the JSX reconciler, 
    // use lowercase names for those components, regardless of how they are initially defined.
    extend({ MyShaderMaterial: MyShaderMaterial })
    // not this exports to all files/paths

    useFrame((state, delta) => {

        const elapsedTime = state.clock.elapsedTime

        // animation sycleing through progress bassed on time
        
        if ((progress > 1 && direction > 0) || (progress < 0 && direction <0) ) {
            direction *= -1
        }
        // console.log(delta)
        progress += direction * delta / 5 


        // uniform update when leva controls change

        // sphereRef.current.rotation.x = - elapsedTime * 0.1
        // particlesRef.current.rotation.y = elapsedTime * 0.5


        // state.camera.lookAt(0, 0, 0);
    })

    return (<>
        <Perf position="top-left" />
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
        {/* <points ref={particlesRef} geometry={particlesGeometry} visible={false}>
            <myShaderMaterial ref={myShaderMaterialRef} blending={THREE.AdditiveBlending} depthWrite={false} />
            <meshBasicMaterial color={"red"} />

        </points> */}

        <Models name={"torus"} getProgress={getProgress}>
            <myShaderMaterial blending={THREE.AdditiveBlending} depthWrite={false} />
            {/* <meshBasicMaterial color={"red"}/> */}
        </Models>


    </>
    )
}

export default Experience