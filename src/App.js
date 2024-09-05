import React, { useState } from "react";
import "./App.css";
import TimeSet from "./components/TimeSet"

const App = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);


  return (
    <div className="App">
      <div className="container">
        <h1>Pomodoro Timer 25 + 5</h1>
        <div className="length">
          <div className="labels" id="break-label">
            <h3>Break length</h3>
            <TimeSet length={breakTime}></TimeSet>
          </div>
          <div className="labels" id="session-label">
            <h3>Session length</h3>
            <TimeSet length={sessionTime}></TimeSet>
          </div>
        </div>
        <div id="timer-label">
          <h2>Session</h2>
          <h1 id="time-remaining">{sessionTime}:00</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
