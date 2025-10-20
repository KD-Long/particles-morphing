import React, { useRef, useMemo, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'


import { shaderMaterial, useTexture, OrbitControls } from '@react-three/drei';

import { useControls } from 'leva'
import * as THREE from 'three'

import vertexShader from '../shaders/particles/vertex.glsl'
import fragmentShader from '../shaders/particles/fragment.glsl'

import Models from './Models.jsx';

const Experience = () => {

    let getProgress = () => {
        return progress
    }
    let setProgress = (val) => {
        progress = val
    }

    let { bgColor, progress, color1, color2 } = useControls({
        bgColor: { value: '#1d1f2a', label: 'Background Color' },
        color1: { value: '#89ff00', label: 'color1' },
        color2: { value: '#0000ff', label: 'color2' },

        progress: { value: 0.0, min: 0.0, max: 1.0, step: 0.01 },

    });

    const MyShaderMaterial = shaderMaterial({
        uResolution: new THREE.Vector2(100, 100),
        uSize: 0.3,
        uColor1: new THREE.Color(color1),
        uColor2: new THREE.Color(color2),
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

        // const elapsedTime = state.clock.elapsedTime
        // state.camera.lookAt(0, 0, 0);
    })

    return (<>
        <Perf position="top-left" />
        <OrbitControls makeDefault />
        {/* Sets background */}
        <color args={[bgColor]} attach='background' />


        {/* Points using PlaneGeometry */}
        {/* <points ref={particlesRef} geometry={particlesGeometry} visible={false}>
            <myShaderMaterial ref={myShaderMaterialRef} blending={THREE.AdditiveBlending} depthWrite={false} />
            <meshBasicMaterial color={"red"} />

        </points> */}

        <Models
            name={"torus"}
            getProgress={getProgress}
            setProgress={setProgress}
            color1={color1}
            color2={color2}
        >
            {/* <myShaderMaterial blending={THREE.AdditiveBlending} depthWrite={false} /> */}
            {/* <meshBasicMaterial color={"red"}/> */}
        </Models>
    </>
    )
}

export default Experience