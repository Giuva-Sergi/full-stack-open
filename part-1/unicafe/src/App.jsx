import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = Math.round(((good - bad) / all) * 100) / 100;
  const positive = Math.round((good / all) * 100 * 100) / 100;

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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

function Button({ name, handler }) {
  return <button onClick={handler}>{name}</button>;
}

function Statistics({ good, neutral, bad, all, average, positive }) {
  if (!good && !neutral && !bad) return <p>No feedback given</p>;
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
  );
}

function StatisticLine({ text, value }) {
  return (
    <div>
      <span>{text}</span>
      <span>{value || ""}</span>
    </div>
  );
}
export default App;
