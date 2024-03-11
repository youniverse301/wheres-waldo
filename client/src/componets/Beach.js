import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import waldoHeader from '../images/waldo-header.png'
import beachImg from '../images/beach.jpeg'
import waldoImg from '../images/waldoImg.png'
import wizardImg from '../images/wizardImg.gif'
import odlawImg from '../images/odlawImg.gif'


export function Beach() {
    const imageRef = useRef(null);
    const divRef = useRef(null);
    const [clickCoordinates, setClickCoordinates] = useState([]);
    const [divs, setDivs] = useState([]);
    const correctCoordinates = { x: 820, y: 420 };
    const correctCoordinates2 = { x: 360, y: 397 };
    const correctCoordinates3 = { x: 143, y: 403 };


    const handleClick = (event)  => {
        const imageRect = imageRef.current.getBoundingClientRect();
        const x = event.clientX -imageRect.left;
        const y = event.clientY - imageRect.top;
        const newCoordinates = { x, y };
        setClickCoordinates(prevCoordinates => [...prevCoordinates, newCoordinates]);
        function handleWaldoClick() {
            console.log(newCoordinates)
            if (isWithinRange(x, y, correctCoordinates)) {
                console.log('in')
                divRef.current.parentNode.removeChild(divRef.current);
              } else {
                console.log("no")
                divRef.current.parentNode.removeChild(divRef.current);
              }
        }
        function handleWizardClick() {
            console.log(newCoordinates)
            if (isWithinRange(x, y, correctCoordinates2)) {
                console.log('in')
                divRef.current.parentNode.removeChild(divRef.current);
              } else {
                console.log("no")
                divRef.current.parentNode.removeChild(divRef.current);
              }
        }
        function handleOdlawClick() {
            console.log(newCoordinates)
            if (isWithinRange(x, y, correctCoordinates3)) {
                console.log('in')
                divRef.current.parentNode.removeChild(divRef.current);
              } else {
                console.log("no")
                divRef.current.parentNode.removeChild(divRef.current);
              }
        }

        if (divRef.current && divRef.current.parentNode) {
            divRef.current.parentNode.removeChild(divRef.current);
        } else {
            setDivs([
                ...divs,
                <div
                key={divs.length}
                ref={divRef}         
                  className='targetBox'
                  style={{
                    position: 'absolute',
                    left: x - 50 / 2,
                    top: y - 50 / 2,
                    width: '50px',
                    height: '50px',
                    border: '3px solid red',
                  }}
                >
                  <div className='test3' onClick={handleOdlawClick}>Odlaw</div>
                  <div className='test2' onClick={handleWizardClick}>Wizard</div>
                  <div className='test' onClick={handleWaldoClick}>Waldo</div>
                </div>,
                ]);
              console.log(divRef.current)
        }
    }

    useEffect(() => {
        console.log(clickCoordinates);
    }, [clickCoordinates]);

    function isWithinRange(x, y, coords) {
        const range = 30;
        const diffX = Math.abs(x - coords.x);
        const diffY = Math.abs(y - coords.y);
        return diffX <= range && diffY <= range;
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
                {divs}
            </div>
        </div>
    </div>
  )
}