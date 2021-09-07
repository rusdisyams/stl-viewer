import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useLoader, useThree, useFrame, extend } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree()
  camera.up.set(0, 0, 1)

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

const StlLoader = (url) => {
  const model = useLoader(STLLoader, url)
  model.center()
  return model
}

const STL = ({ url }) => {
  const material = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 10,
  })

  const model = useMemo(() => StlLoader(url), [url])
  const ref = useRef()

  const { camera } = useThree()

  useEffect(() => {
    const bbox = new THREE.Box3().setFromObject(ref.current)
    const sphere = bbox.getBoundingSphere(new THREE.Sphere())
    const { center, radius } = sphere

    camera.position.copy(
      center.clone().add(new THREE.Vector3(2.0 * radius, 0, 0))
    )
    camera.far = 600 * radius
    camera.updateProjectionMatrix()
  }, [camera, url])

  return (
    <>
      <CameraControls />
      <primitive object={new THREE.AxesHelper(15)} />
      <mesh ref={ref} dispose={null}>
        <primitive object={model} attach='geometry' />
        <meshPhongMaterial color={0xe0740d} material={material} />
      </mesh>
    </>
  )
}

export default STL
