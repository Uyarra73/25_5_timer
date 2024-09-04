import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Pomodoro Timer 25 + 5</h1>
        <div className="length">
          <div className="labels" id="break-label">
            <h3>Break length</h3>
            <div className="arrows-time">
              <button id="break-decrement">-</button>
              <span id="break-length">5</span>
              <button id="break-increment">+</button>
            </div>
          </div>
          <div className="labels" id="session-label">
            <h3>Session length</h3>
            <div className="arrows-time">
              <button id="break-decrement">-</button>
              <span id="break-length">25</span>
              <button id="break-increment">+</button>
            </div>
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
