import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import waldoHeader from '../images/waldo-header.png';
import '../App.css';
import githubImg from '../images/github.png'


export function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [selectedGame, setSelectedGame] = useState('all');

    useEffect(() => {
        fetch(`/lowestTime/${selectedGame === 'all' ? '' : selectedGame}`).then(
            response => response.json()
        ).then(
            data => {
                setLeaderboardData(data);
            }
        );
    }, [selectedGame]);

    return (
        <div className='leaderboardMain'>
            <div className='header'>
                <img className='waldoHeaderImg' src={waldoHeader} alt='Main in red and white striped hat in shirt with round glasses next to sign that reads Wheres Waldo?' />
                <div className='headerBtns'>
                    <Link to="/" className='navBtn'>
                        <button className='homeBtn'>Home</button>
                    </Link>
                    <Link to="/leaderboard" className='navBtn'>
                        <button className='leaderboardBtn'>Leaderboard</button>
                    </Link>
                </div>
            </div>
            <div className='leaderboardContainer'>
                <h1 className='leaderboardTitle'>Leaderboard</h1>
                <div className='gameBtns'>
                    <button className='allBtn' onClick={() => setSelectedGame('all')}>All games</button>
                    <button className='beachBtn' onClick={() => setSelectedGame('beach')}>Beach</button>
                    <button className='factoryBtn' onClick={() => setSelectedGame('factory')}>Factory</button>
                    <button className='skislopeBtn' onClick={() => setSelectedGame('skislope')}>Ski Slopes</button>
                </div>
                <div className='leaderboardScores'>
                    {leaderboardData.map((item, index) => (
                        <div key={index} className='scoreCard'>
                            <p className='scoreCardIndex'>{index + 1 + '.'}</p>
                            <p>{item.game}</p>
                            <p>{item.name}: {item.time}</p>
                        </div>
                    ))}
                </div>
                <a className='github' href='https://github.com/youniverse301/wheres-waldo'>
                    <img src={githubImg}></img>
                </a>
            </div>
        </div>
    );
}