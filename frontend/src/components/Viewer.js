import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import STL from './STL'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useThree, useFrame, extend } from '@react-three/fiber'

extend({ OrbitControls })

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree()
  camera.up.set(0, 0, 1)

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef()

  useFrame((state) => controls.current.update())

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enablePan={false}
    />
  )
}

const Viewer = ({ urlModel }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.6} position={[0, 30, 30]} color='white' />
      <directionalLight
        intensity={0.6}
        position={[0, -30, -30]}
        color='white'
      />
      <Suspense fallback={null}>
        <STL url={urlModel} />
      </Suspense>
      <CameraControls />
    </Canvas>
  )
}

export default Viewer
