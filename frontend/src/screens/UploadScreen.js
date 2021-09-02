import React, { useState } from 'react'
import {
  Form,
  Card,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Viewer from '../components/Viewer'

const UploadScreen = () => {
  const [source, setSource] = useState(null)
  const [isFile, setIsFile] = useState(false)
  const [disable, setDisable] = useState(false)
  const [name, setName] = useState(false)

  const getUrlFile = (event) => {
    if (event.target.files[0] !== '') {
      setIsFile(true)
      setDisable(true)
      setSource(URL.createObjectURL(event.target.files[0]))
    }
  }

  const getName = (event) => {
    setName(true)
  }

  return (
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
          <Col xs='auto'>
            <h5>Upload STL File</h5>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body style={{ height: 300 }}>
        {isFile && <Viewer urlModel={source} />}
      </Card.Body>
      <Card.Footer>
        <Form.Group>
          <Form.File accept='.stl' onChange={getUrlFile} />
        </Form.Group>
        <InputGroup size='sm' className='mb-3'>
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
        </InputGroup>

        {disable && name && (
          <Link to='/'>
            <Button variant='primary' size='sm' block>
              Upload
            </Button>
          </Link>
        )}
      </Card.Footer>
    </Card>
  )
}

export default UploadScreen
