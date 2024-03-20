import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import waldoHeader from '../images/waldo-header.png'
import beachMini from '../images/beachMini.jpeg'

export function Leaderboard() {
    

  return (
    <div className='main'>
        <div className='header'>
            <img className='waldoHeaderImg' src={waldoHeader} alt='Main in red and white striped hat in shirt with round glasses next to sign that reads Wheres Waldo?'></img>
            <div className='headerBtns'>
                <Link to="/" className='navBtn'>
                    <button className='homeBtn'>Home</button>
                </Link>
                <Link to="/leaderboard" className='navBtn'>
                    <button className='leaderboardBtn'>Leaderboard</button>
                </Link>
            </div>
        </div>
    </div>
  )
}