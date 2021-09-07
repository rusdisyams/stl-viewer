import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const UploadScreen = ({ uploadModel, getIdModel }) => {
  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        <Col>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              uploadModel(false, 0)
              getIdModel(0)
            }}
          >
            Go Back
          </Button>
        </Col>
        <Col xs='auto'>
          <h5>View Local STL File</h5>
        </Col>
      </Row>
    </>
  )
}

export default UploadScreen
