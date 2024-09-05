import React, { useState, useEffect } from "react";
import "./App.css";
import TimeSet from "./components/TimeSet";

const App = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(sessionTime * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && timeRemaining !== 0) {
      clearInterval(interval);
    } else if (timeRemaining === 0) {
      clearInterval(interval);
      // Aquí puedes agregar lógica para alternar entre sesión y descanso
    }

    return () => clearInterval(interval); 
  }, [isActive, timeRemaining]);

  useEffect(() => {
    if (!isActive) { 
      setTimeRemaining(sessionTime * 60);
    }
  }, [sessionTime, isActive]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleTimer = () => {
    setIsActive((prevActive) => !prevActive);
  };

  // Funciones para actualizar tiempos
  const incrementBreak = () => setBreakTime((prev) => prev + 1);
  const decrementBreak = () => setBreakTime((prev) => (prev > 1 ? prev - 1 : prev));
  
  const incrementSession = () => setSessionTime((prev) => prev + 1);
  const decrementSession = () => setSessionTime((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="App">
      <div className="container">
        <h1>Pomodoro Timer 25 + 5</h1>
        <div className="length">
          <div className="labels" id="break-label">
            <h3>Break length</h3>
            <TimeSet length={breakTime} onIncrement={incrementBreak} onDecrement={decrementBreak} />
          </div>
          <div className="labels" id="session-label">
            <h3>Session length</h3>
            <TimeSet length={sessionTime} onIncrement={incrementSession} onDecrement={decrementSession} />
          </div>
        </div>
        <div id="timer-label">
          <h2>Session</h2>
          <h1 id="time-remaining">{formatTime(timeRemaining)}</h1>
          <button onClick={toggleTimer}>
            {isActive ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
