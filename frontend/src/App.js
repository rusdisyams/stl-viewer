import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ModelScreen from './screens/ModelScreen'
import UploadScreen from './screens/UploadScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/model/:id' component={ModelScreen} />
          <Route path='/upload' component={UploadScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
