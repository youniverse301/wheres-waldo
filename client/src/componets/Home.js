import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import waldoHeader from '../images/waldo-header.png'
import beachMini from '../images/beachMini.jpeg'

export function Home() {
  return (
    <div className='main'>
      <div className='header'>
        <img className='waldoHeaderImg' src={waldoHeader} alt='Main in red and white striped hat in shirt with round glasses next to sign that reads Wheres Waldo?'></img>
        <div className='headerBtns'>
          <button className='homeBtn'>Home</button>
          <button className='leaderboardBtn'>Leaderboard</button>
        </div>
      </div>
      <div className='games'>
        <Link to="/beach">
          <div className='beachMiniContainer'>
            <h2>Beach1</h2>
            <img className='beachMiniImg' src={beachMini}></img>
          </div>
        </Link>
        <div className='beachMiniContainer'>
          <h2>Beach</h2>
          <img className='beachMiniImg' src={beachMini}></img>
        </div>
        <div className='beachMiniContainer'>
          <h2>Beach</h2>
          <img className='beachMiniImg' src={beachMini}></img>
        </div>
      </div>
      <div>footer</div>
    </div>
  )
}