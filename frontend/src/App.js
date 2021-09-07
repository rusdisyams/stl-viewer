import React, { useState, useEffect, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container, Card, Form } from 'react-bootstrap'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ModelScreen from './screens/ModelScreen'
import UploadScreen from './screens/UploadScreen'

import axios from 'axios'
import { Canvas } from '@react-three/fiber'
import { useProgress, Html } from '@react-three/drei'
import STL from './components/STL'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

const App = () => {
  const [isLoadModel, setIsLoadModel] = useState(false)
  const [isUpload, setIsUpload] = useState(false)
  const [idModel, setIdModel] = useState(0)
  const [heightCanvas, setHeightCanvas] = useState(0)

  const [modelName, setModelName] = useState('')
  const [modelUrl, setModelUrl] = useState('')
  //const [name, setName] = useState(false)
  //const [disable, setDisable] = useState(false)

  useEffect(() => {
    if (idModel > 0) {
      const fetchModel = async () => {
        const { data } = await axios.get(`/api/models/${idModel}`)
        setModelName(data.name)
        setModelUrl(data.url)
      }
      fetchModel()
    }
  }, [idModel])

  const downloadModel = (fileNameFromChild) => {
    axios({
      url: 'http://localhost:3000/models/' + fileNameFromChild + '.stl',
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      console.log('download:' + url)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${fileNameFromChild}.stl`)
      document.body.appendChild(link)
      link.click()
    })
  }

  const loadingModel = (isLoadFromChild, heightFromChild) => {
    setIsLoadModel(isLoadFromChild)
    setHeightCanvas(heightFromChild)
  }

  const getIdModel = (idFromChild) => {
    setIdModel(idFromChild)
  }

  const uploadModel = (uploadFromChild, heightFromChild) => {
    setIsUpload(uploadFromChild)
    setHeightCanvas(heightFromChild)
    //setDisable(false)
    //setName(false)
  }

  const getUrlUpload = (urlFromChild, heightFromChild) => {
    setModelUrl(urlFromChild)
    setHeightCanvas(heightFromChild)
  }

  const getUrlFile = (event) => {
    if (event.target.files[0] !== '') {
      //setDisable(true)
      setModelUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  // const getName = (event) => {
  //   setName(true)
  // }

  // const uploadHandler = (event) => {
  //   const data = new FormData()
  //   data.append('file', 'modelUrl')
  //   axios
  //     .post('http://localhost:3000/upload', data, {
  //       // receive two    parameter endpoint url ,form data
  //     })
  //     .then((res) => {
  //       // then print response status
  //       console.log(res.statusText)
  //     })
  // }

  //const [modelName, modelUrl] = useFetchModel(idModel)

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {!isUpload && !isLoadModel && (
            <HomeScreen
              loadingModel={loadingModel}
              getIdModel={getIdModel}
              uploadModel={uploadModel}
            />
          )}
          {isLoadModel && (
            <ModelScreen
              loadingModel={loadingModel}
              modelName={modelName}
              downloadModel={downloadModel}
            />
          )}
          {isUpload && (
            <>
              <Card.Header>
                <UploadScreen
                  uploadModel={uploadModel}
                  getUrlUpload={getUrlUpload}
                  getIdModel={getIdModel}
                />
                <Form.Group>
                  <Form.File
                    accept='.stl'
                    type='file'
                    onChange={(e) => {
                      getUrlFile(e)
                      setHeightCanvas(320)
                    }}
                  />

                  {/* <InputGroup size='sm' className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='inputGroup-sizing-sm'>
                        Name of the Model
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label='Small'
                      aria-describedby='inputGroup-sizing-sm'
                      onChange={getName}
                    />
                  </InputGroup> */}

                  {/* <Button
                    type='submit'
                    variant='primary'
                    size='sm'
                    block
                    onClick={uploadHandler}
                  >
                    Upload
                  </Button> */}
                </Form.Group>
              </Card.Header>
            </>
          )}

          <Card style={{ height: heightCanvas }}>
            <Card.Body>
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

                <Suspense fallback={<Loader />}>
                  <STL url={modelUrl} />
                </Suspense>
              </Canvas>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </Router>
  )
}

export default App
