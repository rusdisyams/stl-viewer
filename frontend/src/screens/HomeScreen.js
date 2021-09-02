import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import Model from '../components/Model'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HomeScreen = () => {
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
          <Link to={'/upload'}>
            <Button variant='primary' size='sm'>
              Upload File
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {models.map((model) => (
          <Col key={model._id} sm={12} md={6} lg={4} xl={3}>
            <Model model={model} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default HomeScreen
