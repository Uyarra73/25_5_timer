import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TimeSet from "./components/TimeSet";
import Sound from "./assets/sound.mp3"

const App = () => {
  const [breakTime, setBreakTime] = useState(5); // Tiempo de descanso en minutos
  const [sessionTime, setSessionTime] = useState(25); // Tiempo de sesión en minutos
  const [timeRemaining, setTimeRemaining] = useState(sessionTime * 60); // Tiempo restante en segundos
  const [isActive, setIsActive] = useState(false); // Controla si el temporizador está activo
  const [session, setSession] = useState(true); // Controla si estamos en tiempo de sesión o de descanso

  const audioRef = useRef(new Audio(Sound));

  useEffect(() => {
    let interval = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      if (session) {
        setSession(false); // Cambia a tiempo de descanso
        setTimeRemaining(breakTime * 60); // Establece el tiempo de descanso
        audioRef.current.play(); // Reproduce el sonido
      } else {
        setSession(true); // Cambia a tiempo de sesión
        setTimeRemaining(sessionTime * 60); // Establece el tiempo de sesión
      }
    } else if (!isActive) {
      clearInterval(interval); // Detener el intervalo cuando se pausa el temporizador
    }

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente o al cambiar dependencias
  }, [isActive, timeRemaining, session, sessionTime, breakTime]);

  // Actualiza el tiempo restante cuando cambia el tiempo de sesión o estado de sesión
  useEffect(() => {
    if (!isActive) { 
      setTimeRemaining(session ? sessionTime * 60 : breakTime * 60);
    }
  }, [sessionTime, breakTime, session, isActive]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleTimer = () => {
    setIsActive((prevActive) => !prevActive); // Cambia entre activo e inactivo sin reiniciar el tiempo
  };

  // Funciones para actualizar tiempos
  const incrementBreak = () => setBreakTime((prev) => prev + 1);
  const decrementBreak = () => setBreakTime((prev) => (prev > 1 ? prev - 1 : prev));
  
  const incrementSession = () => setSessionTime((prev) => (prev < 60 ? prev + 1 : prev)); // Máximo de 60 minutos
  const decrementSession = () => setSessionTime((prev) => (prev > 1 ? prev - 1 : prev));

  // Función para reiniciar el temporizador
  const resetTimer = () => {
    setBreakTime(5);
    setSessionTime(25);
    setTimeRemaining(25 * 60);
    setIsActive(false);
    setSession(true);
  };

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
        <div id="timer-label" 
            style={{background: timeRemaining < 11 ? "red" : "lightgreen",
              color: timeRemaining < 11? "white" : "black"  // Color en blanco si el tiempo es menor a 11 segundos
            }} >
          <h2>{session ? "Session Time" : "Break Time"}</h2>
          <h1 id="time-remaining">{formatTime(timeRemaining)}</h1>
          <button onClick={toggleTimer}>
            {isActive ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}
          </button>
          <button onClick={resetTimer}><i class="fa-solid fa-rotate-right"></i></button> {/* Botón de reinicio */}
        </div>
      </div>
    </div>
  );
};

export default App;
