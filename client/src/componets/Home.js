import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import waldoHeader from '../images/waldo-header.png'
import beachMini from '../images/beachMini.jpeg'

export function Home() {
    const [leaderboard, setLeaderboard] = useState([{}]);
    const [isOpen, setIsOpen] = useState(false);
    const [leaderboardText, setLeaderboardText] = useState('Show top 5 scores')

    useEffect(() => {
        fetch("/lowestTime").then(
            response => response.json()
        ).then(
            data => {
                setLeaderboard(data)
                console.log(data)
            }
        )
    }, [])

    const toggleLeaderBoard = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setLeaderboardText('Hide scores')
        } else {
            setLeaderboardText('Show top 5 scores')
        }
    }

  return (
    <div className='main'>
      <div className='header'>
        <img className='waldoHeaderImg' src={waldoHeader} alt='Main in red and white striped hat in shirt with round glasses next to sign that reads Wheres Waldo?'></img>
        <div className='headerBtns'>
          <button className='homeBtn'>Home</button>
          <Link to="/leaderboard">
            <button className='leaderboardBtn'>Leaderboard</button>
          </Link>
        </div>
      </div>
      <div className='games'>
          <div className='beachMiniContainer'>
            <img className='beachMiniImg' src={beachMini}></img>
            <div className='gameTextContainer'>
            <Link to="/beach">
                <h2>Start game</h2>
            </Link>
            <div className='beachLeaderboard' onClick={toggleLeaderBoard}>{leaderboardText}</div>
                {isOpen && (
                    <div>
                        {leaderboard.map((item, index) => (
                            <div key={index}>
                                <p>{item.name} {item.time}</p>
                            </div>
                        ))}
                    </div>
                )}
          </div>
          </div>
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