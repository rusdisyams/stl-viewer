import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useLoader, useThree } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const StlLoader = (url) => {
  const model = useLoader(STLLoader, url)
  return model
}

const STL = ({ url }) => {
  const material = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 10,
  })

  const model = useMemo(() => StlLoader(url), [url])

  model.center()

  const ref = useRef()

  const { camera } = useThree()

  useEffect(() => {
    const bbox = new THREE.Box3().setFromObject(ref.current)
    const sphere = bbox.getBoundingSphere(new THREE.Sphere())
    const { center, radius } = sphere

    camera.position.copy(
      center.clone().add(new THREE.Vector3(2.0 * radius, 0, 0))
    )
    camera.far = 500 * radius
    camera.updateProjectionMatrix()
  }, [camera, url])

  return (
    <>
      <primitive object={new THREE.AxesHelper(15)} />
      <mesh ref={ref} dispose={null}>
        <primitive object={model} attach='geometry' />
        <meshPhongMaterial color={0xe0740d} material={material} />
      </mesh>
    </>
  )
}

export default STL
