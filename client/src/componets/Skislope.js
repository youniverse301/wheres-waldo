import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import axios from 'axios';
import waldoHeader from '../images/waldo-header.png'
import skislopeImg from '../images/skislope.png'
import waldoImg from '../images/waldoImg.png'
import wendaImg from '../images/wenda.png'
import wizardImg from '../images/wizardImg.gif'
import odlawImg from '../images/odlawImg.gif'
var Filter = require('bad-words'),
filter = new Filter();

export function Skislope() {
    const imageRef = useRef(null);
    const targetRef = useRef(null);
    const navigate = useNavigate();
    const [targetDivs, setTargetDivs] = useState([]);
    const [charCoords, setCharCoords] = useState([{}]);
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [waldoClicked, setWaldoClicked] = useState(false);
    const [wendaClicked, setWendaClicked] = useState(false);
    const [wizardClicked, setWizardClicked] = useState(false);
    const [odlawClicked, setOdlawClicked] = useState(false);
    const [charClicked, setCharClicked] = useState(0);
    const [winDiv, setWinDiv] = useState([]);
    const [waldoTitle, setWaldoTitle] = useState('characterTitle')
    const [waldoImage, setWaldoImage] = useState('waldoImage')
    const [wizardTitle, setWizardTitle] = useState('characterTitle')
    const [wizardImage, setWizardImage] = useState('wizardImage')
    const [wendaTitle, setWendaTitle] = useState('characterTitle')
    const [wendaImage, setWendaImage] = useState('wizardImage')
    const [odlawTitle, setOdlawTitle] = useState('characterTitle')
    const [odlawImage, setOdlawImage] = useState('odlawImage')

    const handleClick = (event)  => {
        const imageRect = imageRef.current.getBoundingClientRect();
        const xPercentage = (event.clientX - imageRect.left) / imageRect.width;
        const yPercentage = (event.clientY - imageRect.top) / imageRect.height;
        const x = xPercentage * imageRef.current.naturalWidth;
        const y = yPercentage * imageRef.current.naturalHeight;

        function handleWaldoClick() {
            if (isWithinRange(x, y, charCoords[0])) {
                targetRef.current.parentNode.removeChild(targetRef.current);
                setWaldoClicked(true)
                setWaldoTitle('foundText')
                setWaldoImage('foundImage')
                setCharClicked(prevCharClicked => prevCharClicked +1)
              } else {
                targetRef.current.parentNode.removeChild(targetRef.current);
              }
        }
        function handleWendaClick() {
            if (isWithinRange(x, y, charCoords[1])) {
                targetRef.current.parentNode.removeChild(targetRef.current);
                setWendaClicked(true)
                setWendaTitle('foundText')
                setWendaImage('foundImage')
                setCharClicked(prevCharClicked => prevCharClicked +1)
              } else {
                targetRef.current.parentNode.removeChild(targetRef.current);
              }
        }
        function handleWizardClick() {
            if (isWithinRange(x, y, charCoords[2])) {
                targetRef.current.parentNode.removeChild(targetRef.current);
                setWizardClicked(true)
                setWizardTitle('foundText')
                setWizardImage('foundImage')
                setCharClicked(prevCharClicked => prevCharClicked +1)
              } else {
                targetRef.current.parentNode.removeChild(targetRef.current);
              }
        }
        function handleOdlawClick() {
            if (isWithinRange(x, y, charCoords[3])) {
                targetRef.current.parentNode.removeChild(targetRef.current);
                setOdlawClicked(true)
                setOdlawTitle('foundText')
                setOdlawImage('foundImage')
                setCharClicked(prevCharClicked => prevCharClicked +1)
              } else {
                targetRef.current.parentNode.removeChild(targetRef.current);
              }
        }

        if (targetRef.current && targetRef.current.parentNode) {
            targetRef.current.parentNode.removeChild(targetRef.current);
        } else {
            const waldoClass = waldoClicked ? 'hidden' : 'waldoBtn';
            const wendaClass = wendaClicked ? 'hidden' : 'wizardBtn';
            const wizardClass = wizardClicked ? 'hidden' : 'wizardBtn';
            const odlawClass = odlawClicked ? 'hidden' : 'odlawBtn';
            setTargetDivs([
                ...targetDivs,
                <div
                key={targetDivs.length}
                ref={targetRef}         
                  className='targetBox'
                  style={{
                    position: 'absolute',
                    left: event.clientX - imageRect.left - 25,
                    top: event.clientY - imageRect.top -25,
                    width: '50px',
                    height: '50px',
                    border: '3px solid #ED2724',
                  }}
                >
                  <div className={odlawClass} onClick={handleOdlawClick}>Odlaw</div>
                  <div className={wizardClass} onClick={handleWizardClick}>Wizard</div>
                  <div className={wendaClass} onClick={handleWendaClick}>Wenda</div>
                  <div className={waldoClass}  onClick={handleWaldoClick}>Waldo</div>
                </div>,
                ]);
        }
    }

    useEffect(() => {
        if (charClicked >= 4) {
            toggleTimer()
            displayWin()
        }
    }, [charClicked]);

    useEffect(() => {
        fetch("/data/skislope").then(
            response => response.json()
        ).then(
            data => {
                setCharCoords(data)
            }
        )
    }, [])

    function isWithinRange(x, y, coords) {
        const range = 50;
        const diffX = Math.abs(x - coords.x);
        const diffY = Math.abs(y - coords.y);
        return diffX <= range && diffY <= range;
    }

    useEffect(() => {
        let interval;
        if (isRunning) {
          interval = setInterval(() => {
            setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
          }, 10);
        }
        
        return () => clearInterval(interval);
    }, [isRunning]);    
    
    const formatTime = (time) => {
        const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000));
        const seconds = Math.floor((time % (60 * 1000)) / 1000);
        const millis = time % 1000;
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${millis < 100 ? '0' : ''}${millis < 10 ? '0' : ''}${millis}`;
    };

    const toggleTimer = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    const displayWin = () => {
        const handleSubmit = (event) => {
            event.preventDefault();
            const nickName = event.target.nicknameInput.value;
            sendScore(nickName);
            navigate('/')
        };
        const appendWinDiv = 
        <div key={winDiv.length} className='winScreenContainer'>
            <h2>You won!</h2>
            <p>Please insert a nickname</p>
            <form className='nicknameForm' onSubmit={handleSubmit}>
                <input type='text' className='nicknameInput' name='nicknameInput' maxLength={25}></input>
                <input type='submit' value='Submit' className='nicknameSubmit'></input>
            </form>
        </div>;

        setWinDiv(prevwinDiv => [...prevwinDiv, appendWinDiv]);
    }

    const sendScore = async (nickName) => {
        let game = "Ski Slopes"
        let name = filter.clean(nickName)
        let time = formatTime(milliseconds)
        try {
            await axios.post('/scores', { game:game, name: name, time: time })
        } catch (error) {
            console.log('Error sending data to express:', error)
        }
    }

  return (
    <div className='beachMain'>
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
        <div className='gameContainer'>
            <div>{winDiv.map(div => div)}</div>
            <div className='charactersContainer'>
                <div className='characterContainer'>
                    <img className={waldoImage} src={waldoImg}></img>
                    <h2 className={waldoTitle}>Waldo</h2>
                </div>
                <div className='characterContainer'>
                    <img className={wendaImage} src={wendaImg}></img>
                    <h2 className={wendaTitle}>Wenda</h2>
                </div>
                <div className='characterContainer'>
                    <img className={wizardImage} src={wizardImg}></img>
                    <h2 className={wizardTitle}>Wizard</h2>
                </div>
                <div className='characterContainer'>
                    <img className={odlawImage} src={odlawImg}></img>
                    <h2 className={odlawTitle}>Odlaw</h2>
                </div>
                <p>{formatTime(milliseconds)}</p>
            </div>
            <div className='gameImgContainer'>
                <img ref={imageRef} className='gameImg' src={skislopeImg} onClick={handleClick}></img>
                {targetDivs}
            </div>
        </div>
    </div>
  )
}