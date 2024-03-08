import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from './componets/Home'
import { Beach } from './componets/Beach'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/beach' element={<Beach />}></Route>
    </Routes>
  )
}

export default App