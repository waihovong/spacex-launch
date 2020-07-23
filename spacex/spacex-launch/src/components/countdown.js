import React, { useState, useEffect } from "react";
import "../App.css";

const Countdown = () => {
    const [nextLaunch, setNextLaunch] = useState([]);s
    const [countdownDate, setCountdownDate] = useState(new Date().toUTCString());

    useEffect(() => {
        setInterval(() => setNewTime(), 1000)
        fetchSpaceX();
        async function fetchSpaceX() {
            const url = "https://api.spacexdata.com/v4/launches/next"
                const response = await fetch(url);
                const data = await response.json();
                setNextLaunch(data);
                setCountdownDate(new Date (data.date_utc).toUTCString());
                
            }
        }, []);
        
        const setNewTime = () => {
            if (countdownDate) {
            const currentTime = new Date().toUTCString();
            // Get the time remaining until the countdown date
            const distanceToDate = countdownDate - currentTime;
            // console.log(distanceToDate);
            // Calculate days, hours, minutes and seconds remaining
            let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
              (distanceToDate / (1000 * 60 * 60)) % 24,
            );
            let minutes = Math.floor(
              (distanceToDate / (1000 * 60) % 60),
            );
            let seconds = Math.floor((distanceToDate / 1000 % 60));
        
            const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
            if (numbersToAddZeroTo.includes(hours)) {
              hours = `0${hours}`;
            } else if (numbersToAddZeroTo.includes(minutes)) {
              minutes = `0${minutes}`;
            } else if (numbersToAddZeroTo.includes(seconds)) {
              seconds = `0${seconds}`;
            }
        
            // Set the state to each new time
            setState({ days: days, hours: hours, minutes, seconds });
          }
    };

    return (
        <div>
          <div className='countdown-wrapper'>
            <div className='time-section'>
              <div className='time'>{state.days || '0'}</div>
              <small className="time-text">Days</small>
            </div>
            <div className='time-section'>
              <div className='time'>:</div>
            </div>
            <div className='time-section'>
              <div className='time'>{state.hours || '00'}</div>
              <small className="time-text">Hours</small>
            </div>
            <div className='time-section'>
              <div className='time'>:</div>
            </div>
            <div className='time-section'>
              <div className='time'>{state.minutes || '00'}</div>
              <small className="time-text">Minutes</small>
            </div>
            <div className='time-section'>
              <div className='time'>:</div>
            </div>
            <div className='time-section'>
              <div className='time'>{state.seconds || '00'}</div>
              <small className="time-text">Seconds</small>
            </div>
          </div>
        </div>
      );
    };
export default Countdown;