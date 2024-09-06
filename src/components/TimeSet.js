import React from "react";

const TimeSet = ({ length, onIncrement, onDecrement }) => {
  return (
    <div className="arrows-time">
      <button id="decrement" onClick={onDecrement}>-</button>
      <span id="break-length">{length}</span>
      <button id="increment" onClick={onIncrement}>+</button>
    </div>
  );
};

export default TimeSet;
