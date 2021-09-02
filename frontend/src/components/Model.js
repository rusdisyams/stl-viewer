import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const Model = ({ model }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/model/${model._id}`}>
        <Button variant='secondary' size='sm'>
          {model.name}
        </Button>
      </Link>
    </Card>
  )
}

export default Model
