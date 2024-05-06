import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleClick(name) {
    switch (name) {
      case "good":
        return setGood(good + 1);
      case "neutral":
        return setNeutral(neutral + 1);
      case "bad":
        return setBad(bad + 1);
      default:
        break;
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handler={() => handleClick("good")} />
      <Button name="neutral" handler={() => handleClick("neutral")} />
      <Button name="bad" handler={() => handleClick("bad")} />
      <h2>statistics</h2>
      <div>
        <span>good</span>
        <span>{good}</span>
      </div>
      <div>
        <span>neutral</span>
        <span>{neutral}</span>
      </div>
      <div>
        <span>bad</span>
        <span>{bad}</span>
      </div>
    </div>
  );
};

function Button({ name, handler }) {
  return <button onClick={handler}>{name}</button>;
}

export default App;
