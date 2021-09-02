import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Viewer from '../components/Viewer'
import axios from 'axios'

const ModelScreen = () => {
  const [model, setModel] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await axios.get(`/api/models/${id}`)
      setModel(data)
    }
    fetchModel()
  }, [id])

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Link to='/'>
                <Button variant='secondary' size='sm'>
                  Go Back
                </Button>
              </Link>
            </Col>
            <Col xs={5} className='text-center'>
              <h5>{model.name}</h5>
            </Col>
            <Col className='text-right'>
              <Link to='/'>
                <Button variant='primary' size='sm'>
                  Download
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ height: 500 }}>
          <Viewer urlModel={model.url} />
          {/* {model.url} */}
        </Card.Body>
      </Card>
    </>
  )
}

export default ModelScreen
