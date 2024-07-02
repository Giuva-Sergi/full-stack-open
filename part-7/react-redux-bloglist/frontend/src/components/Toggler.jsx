import React, { useState } from "react";

function Toggler({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  return (
    <div>
      {isVisible && React.cloneElement(children, { toggleVisibility })}
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "cancel" : "new note"}
      </button>
    </div>
  );
}

export default Toggler;
