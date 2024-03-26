import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import waldoHeader from '../images/waldo-header.png'
import beachMini2 from '../images/beachMini2.jpeg'
import factoryMini from '../images/factoryMini.jpeg'
import skislopeMini from '../images/skislopeMini.png'
import githubImg from '../images/github.png'

export function Home() {
    const [beachLeaderboard, setBeachLeaderboard] = useState([{}]);
    const [factoryLeaderboard, setFactoryLeaderboard] = useState([{}]);
    const [skislopeLeaderboard, setSkislopeLeaderboard] = useState([{}]);
    const [isBeachOpen, setIsBeachOpen] = useState(false);
    const [beachLeaderboardText, setBeachLeaderboardText] = useState('Show top 5 scores')
    const [isFactoryOpen, setIsFactoryOpen] = useState(false);
    const [factoryLeaderboardText, setFactoryLeaderboardText] = useState('Show top 5 scores')
    const [isSkislopeOpen, setIsSkislopeOpen] = useState(false);
    const [skiSlopeLeaderboardText, setSkislopeLeaderboardText] = useState('Show top 5 scores')

    useEffect(() => {
        fetch("/lowestTime/beach").then(
            response => response.json()
        ).then(
            data => {
                setBeachLeaderboard(data)
            }
        )
    }, [])
    useEffect(() => {
        fetch("/lowestTime/factory").then(
            response => response.json()
        ).then(
            data => {
                setFactoryLeaderboard(data)
            }
        )
    }, [])
    useEffect(() => {
        fetch("/lowestTime/skislope").then(
            response => response.json()
        ).then(
            data => {
                setSkislopeLeaderboard(data)
            }
        )
    }, [])

    const toggleBeachLeaderBoard = () => {
        setIsBeachOpen(!isBeachOpen);
        if (!isBeachOpen) {
            setBeachLeaderboardText('Hide scores')
        } else {
            setBeachLeaderboardText('Show top 5 scores')
        }
    }
    const toggleFactoryLeaderBoard = () => {
        setIsFactoryOpen(!isFactoryOpen);
        if (!isFactoryOpen) {
            setFactoryLeaderboardText('Hide scores')
        } else {
            setFactoryLeaderboardText('Show top 5 scores')
        }
    }
    const toggleSkislopeLeaderBoard = () => {
        setIsSkislopeOpen(!isSkislopeOpen);
        if (!isSkislopeOpen) {
            setSkislopeLeaderboardText('Hide scores')
        } else {
            setSkislopeLeaderboardText('Show top 5 scores')
        }
    }

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
      <div className={`games ${isBeachOpen ? 'slide-up' : ' '}`}>
          <div className='gameMiniContainer'>
            <img className='gameMiniImg' src={beachMini2} alt='small version of wheres waldo beach map'></img>
            <div className='gameTextContainer'>
                <Link to="/beach">
                    <h2>Start game</h2>
                </Link>
                <div className='gameLeaderboard' onClick={toggleBeachLeaderBoard}>{beachLeaderboardText}</div>
                    {isBeachOpen && (
                        <div className={`scores ${isBeachOpen ? 'slide-down' : ' '}`}>
                            {beachLeaderboard.map((item, index) => (
                                <div key={index}>
                                    <p>{item.name} {item.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
          </div>
        <div className='gameMiniContainer'>
          <img className='gameMiniImg' src={factoryMini} alt='small version of wheres factory map'></img>
          <div className='gameTextContainer'>
                <Link to="/factory">
                    <h2>Start game</h2>
                </Link>
                <div className='gameLeaderboard' onClick={toggleFactoryLeaderBoard}>{factoryLeaderboardText}</div>
                    {isFactoryOpen && (
                        <div className={`scores ${isFactoryOpen ? 'slide-down' : ' '}`}>
                            {factoryLeaderboard.map((item, index) => (
                                <div key={index}>
                                    <p>{item.name} {item.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
        <div className='gameMiniContainer'>
          <img className='gameMiniImg' src={skislopeMini} alt='small version of wheres waldo ski slope map'></img>
          <div className='gameTextContainer'>
                <Link to="/skislope">
                    <h2>Start game</h2>
                </Link>
                <div className='gameLeaderboard' onClick={toggleSkislopeLeaderBoard}>{skiSlopeLeaderboardText}</div>
                    {isSkislopeOpen && (
                        <div className={`scores ${isSkislopeOpen ? 'slide-down' : ' '}`}>
                            {skislopeLeaderboard.map((item, index) => (
                                <div key={index}>
                                    <p>{item.name} {item.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
      </div>
      <a className='github' href='https://github.com/youniverse301/wheres-waldo'>
        <img src={githubImg} alt='github logo'></img>
      </a>
    </div>
  )
}