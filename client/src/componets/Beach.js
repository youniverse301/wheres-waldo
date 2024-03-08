import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import waldoHeader from '../images/waldo-header.png'
import beachImg from '../images/beach.jpeg'
import waldoImg from '../images/waldoImg.png'
import wizardImg from '../images/wizardImg.gif'
import odlawImg from '../images/odlawImg.gif'


export function Beach() {
    const imageRef = useRef(null);
    const [clickCoordinates, setClickCoordinates] = useState(null);

    const handleClick = (event)  => {
        const imageRect = imageRef.current.getBoundingClientRect();
        const x = event.clientX -imageRect.left;
        const y = event.clientY - imageRect.top;
        setClickCoordinates({ x,y })
        console.log(clickCoordinates)
    }

  return (
    <div className='beachMain'>
        <div className='header'>
            <img className='waldoHeaderImg' src={waldoHeader} alt='Main in red and white striped hat in shirt with round glasses next to sign that reads Wheres Waldo?'></img>
            <div className='headerBtns'>
                <button className='homeBtn'>Home</button>
                <button className='leaderboardBtn'>Leaderboard</button>
            </div>
        </div>
        <div className='beachContainer'>
            <div className='charactersContainer'>
                <div className='characterContainer'>
                    <img className='waldoImg' src={waldoImg}></img>
                    <h2>Waldo</h2>
                </div>
                <div className='characterContainer'>
                    <img className='wizardImg' src={wizardImg}></img>
                    <h2>Wizard</h2>
                </div>
                <div className='characterContainer'>
                    <img className='odlawImg' src={odlawImg}></img>
                    <h2>Odlaw</h2>
                </div>
            </div>
            <div className='beachContainer'>
                <img ref={imageRef} className='beachImg' src={beachImg} onClick={handleClick}></img>
            </div>
        </div>
    </div>
  )
}