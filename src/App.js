import "./App.css";
import TimeSet from "./components/TimeSet"

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Pomodoro Timer 25 + 5</h1>
        <div className="length">
          <div className="labels" id="break-label">
            <h3>Break length</h3>
            <TimeSet length="5"></TimeSet>
          </div>
          <div className="labels" id="session-label">
            <h3>Session length</h3>
            <TimeSet length="25"></TimeSet>
          </div>
        </div>
        <div id="timer-label">
          <h2>Session</h2>
          <h1 id="time-remaining">25:00</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
