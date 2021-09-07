import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button, Card } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = ({ loadingModel, getIdModel, uploadModel }) => {
  const [models, setModels] = useState([])

  useEffect(() => {
    const fetchModels = async () => {
      const { data } = await axios.get('/api/models')
      setModels(data)
    }
    fetchModels()
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <p>My uploaded STL Files:</p>
        </Col>
        <Col className='text-right'>
          <Button
            variant='primary'
            size='sm'
            onClick={() => uploadModel(true, 0)}
          >
            View 3D Model From Local Drive
          </Button>
        </Col>
      </Row>
      <Row>
        {models.map((model) => (
          <Col key={model._id} sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 p-3 rounded'>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => {
                  loadingModel(true, 420)
                  getIdModel(model._id)
                }}
              >
                {model.name}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default HomeScreen
