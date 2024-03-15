import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from './componets/Home'
import { Beach } from './componets/Beach'
import { Leaderboard } from './componets/Leaderboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/beach' element={<Beach />}></Route>
      <Route path='/leaderboard' element={<Leaderboard />}></Route>
    </Routes>
  )
}

export default App