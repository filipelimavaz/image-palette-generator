import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

function App() {

  const [image, setImage] = useState(null)

  return (
    <>
      <Header onImageUpload={setImage}></Header>
      <Main imageUpload={image}></Main>
    </>
  )
}

export default App
