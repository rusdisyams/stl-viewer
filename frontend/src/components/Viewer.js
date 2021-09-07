import React, { Suspense } from 'react'
import STL from './STL'
import { Canvas } from '@react-three/fiber'

const Viewer = ({ urlModel }) => {
  //const [show, setShow] = useState(true)
  //useEffect(() => {
  //void setInterval(() => setShow((show) => !show), 1000)
  // var canvas = document.getElementById('Canvas')
  // var context = canvas.getContext('3d')
  // context.clearRect(0, 0, canvas.width, canvas.height)
  //}, [])
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={0.6}
          position={[0, 30, 30]}
          color='white'
        />
        <directionalLight
          intensity={0.6}
          position={[0, -30, -30]}
          color='white'
        />
        {/* {show && (
          <Suspense fallback={null}>
            <STL url={urlModel} />
          </Suspense>
        )} */}
        <Suspense fallback={null}>
          <STL url={urlModel} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Viewer
