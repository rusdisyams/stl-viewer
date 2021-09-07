import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const ModelScreen = ({ loadingModel, modelName, downloadModel }) => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => {
                loadingModel(false, 0)
              }}
            >
              Go Back
            </Button>
          </Col>
          <Col xs={5} className='text-center'>
            <h5>{modelName}</h5>
          </Col>
          <Col className='text-right'>
            {/* <Button
              variant='primary'
              size='sm'
              onClick={() => downloadModel(modelName)}
            >
              Download
            </Button> */}
          </Col>
        </Row>
      </Card.Header>
    </Card>
  )
}

export default ModelScreen
