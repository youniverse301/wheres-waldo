import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import axios from 'axios';
import waldoHeader from '../images/waldo-header.png'
import beachImg from '../images/beach.jpeg'
import waldoImg from '../images/waldoImg.png'
import wizardImg from '../images/wizardImg.gif'
import odlawImg from '../images/odlawImg.gif'


export function Beach() {
    const imageRef = useRef(null);
    const targetRef = useRef(null);
    const [clickCoordinates, setClickCoordinates] = useState([]);
    const [divs, setDivs] = useState([]);
    const [charCoords, setCharCoords] = useState([{}]);
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [waldoClicked, setWaldoClicked] = useState(false);
    const [wizardClicked, setWizardClicked] = useState(false);
    const [odlawClicked, setOdlawClicked] = useState(false);
    const [charClicked, setCharClicked] = useState(0);
    const [winDiv, setWinDiv] = useState([]);

    const handleClick = (event)  => {
        const imageRect = imageRef.current.getBoundingClientRect();
        const xPercentage = (event.clientX - imageRect.left) / imageRect.width;
        const yPercentage = (event.clientY - imageRect.top) / imageRect.height;
        const x = xPercentage * imageRef.current.naturalWidth;
        const y = yPercentage * imageRef.current.naturalHeight;
        const newCoordinates = { x, y };
        setClickCoordinates(prevCoordinates => [...prevCoordinates, newCoordinates]);

        function handleWaldoClick() {
            console.log(newCoordinates)
            if (isWithinRange(x, y, charCoords[0])) {
                console.log('in')
                targetRef.current.parentNode.removeChild(targetRef.current);
                setWaldoClicked(true)
                setCharClicked(prevCharClicked => prevCharClicked +1)
              } else {
                console.log("no")
                targetRef.current.parentNode.removeChild(targetRef.current);
              }
        }
        function handleWizardClick() {
            console.log(newCoordinates)
            if (isWithinRange(x, y, charCoords[1])) {
                console.log('in')
                targetRef.current.parentNode.removeChild(targetRef.current);
                setWizardClicked(true)
                setCharClicked(prevCharClicked => prevCharClicked +1)
              } else {
                console.log("no")
                targetRef.current.parentNode.removeChild(targetRef.current);
              }
        }
        function handleOdlawClick() {
            console.log(newCoordinates)
            if (isWithinRange(x, y, charCoords[2])) {
                console.log('in')
                targetRef.current.parentNode.removeChild(targetRef.current);
                setOdlawClicked(true)
                setCharClicked(prevCharClicked => prevCharClicked +1)
              } else {
                console.log("no")
                targetRef.current.parentNode.removeChild(targetRef.current);
              }
        }

        if (targetRef.current && targetRef.current.parentNode) {
            targetRef.current.parentNode.removeChild(targetRef.current);
        } else {
            const waldoClass = waldoClicked ? 'hidden' : 'waldoBtn';
            const wizardClass = wizardClicked ? 'hidden' : 'wizardBtn';
            const odlawClass = odlawClicked ? 'hidden' : 'odlawBtn';
            setDivs([
                ...divs,
                <div
                key={divs.length}
                ref={targetRef}         
                  className='targetBox'
                  style={{
                    position: 'absolute',
                    left: event.clientX - imageRect.left - 25,
                    top: event.clientY - imageRect.top -25,
                    width: '50px',
                    height: '50px',
                    border: '3px solid red',
                  }}
                >
                  <div className={odlawClass} onClick={handleOdlawClick}>Odlaw</div>
                  <div className={wizardClass} onClick={handleWizardClick}>Wizard</div>
                  <div className={waldoClass}  onClick={handleWaldoClick}>Waldo</div>
                </div>,
                ]);
              console.log(targetRef.current)
        }
    }

    useEffect(() => {
        console.log(clickCoordinates);
    }, [clickCoordinates]);

    useEffect(() => {
        console.log(waldoClicked);
    }, [waldoClicked]);

    useEffect(() => {
        console.log(charClicked);
        if (charClicked >= 3) {
            console.log('winner winner chicken dinner')
            toggleTimer()
            displayWin()
        }
    }, [charClicked]);

    useEffect(() => {
        fetch("/data/beach").then(
            response => response.json()
        ).then(
            data => {
                setCharCoords(data)
                console.log(data)
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

    const toggleWaldo = () => {
        setWaldoClicked(prevwaldoClicked => !prevwaldoClicked);
    };
    
    const resetTimer = () => {
        setMilliseconds(0);
        setIsRunning(false);
    };

    const displayWin = () => {
        const handleSubmit = (event) => {
            event.preventDefault();
            const nickName = event.target.nicknameInput.value;
            sendScore(nickName);
        };
        const appendWinDiv = 
        <div key={winDiv.length} className='winScreenContainer'>
            <h2>You won!</h2>
            <p>Please insert a nickname</p>
            <form className='nicknameForm' onSubmit={handleSubmit}>
                <input type='text' className='nicknameInput' name='nicknameInput'></input>
                <input type='submit' value='Submit'></input>
            </form>
        </div>;

        setWinDiv(prevwinDiv => [...prevwinDiv, appendWinDiv]);
    }

    const sendScore = async (nickName) => {
        let game = "beach"
        let name = nickName
        let time = formatTime(milliseconds)
        try {
            const response = await axios.post('/scores', { game: game, name: name, time: time })
            console.log(response.data);
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
                <p>{formatTime(milliseconds)}</p>
            </div>
            <div className='gameImgContainer'>
                <img ref={imageRef} className='gameImg' src={beachImg} onClick={handleClick}></img>
                {divs}
            </div>
        </div>
    </div>
  )
}