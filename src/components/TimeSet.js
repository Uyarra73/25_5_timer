import React, { useState } from "react";

const TimeSet = ({ length }) => {
  const [decidedLength, setDecidedLength] = useState(length);

  const decrement = () => {
    if (decidedLength > 1) {
      setDecidedLength(decidedLength - 1);
    }
  };

  const increment = () => {
    setDecidedLength(decidedLength + 1);
  };

  return (
    <div className="arrows-time">
      <button id="break-decrement" onClick={decrement}>-</button>
      {/* Renderizar el valor actualizado de decidedLength */}
      <span id="break-length">{decidedLength}</span>
      <button id="break-increment" onClick={increment}>+</button>
    </div>
  );
};

export default TimeSet;