import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Container fluid='md'>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='/'>
            <h3>STL Viewer</h3>
          </Navbar.Brand>
        </Navbar>
      </Container>
    </header>
  )
}

export default Header
