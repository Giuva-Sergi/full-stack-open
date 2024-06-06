import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  function handleClick() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  function handleVote() {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [selected]: (prevPoints[selected] += 1),
    }));
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>{`has ${points[selected]} vote(s)`}</p>
      <Button text="vote" handler={handleVote} />
      <Button text="next anecdote" handler={handleClick} />
      <MostVotedAnectode points={points} anecdotes={anecdotes} />
    </div>
  );
};

function Button({ text, handler }) {
  return <button onClick={handler}>{text}</button>;
}

function MostVotedAnectode({ points, anecdotes }) {
  function findMostVoted() {
    let maxPoints = 0;
    let mostVotedAnecdote;

    for (let key in points) {
      if (points[key] > maxPoints) {
        maxPoints = points[key];
        mostVotedAnecdote = anecdotes[key];
      }
    }
    return { maxPoints, mostVotedAnecdote };
  }

  const { maxPoints, mostVotedAnecdote } = findMostVoted();

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{mostVotedAnecdote}</p>
      <p>{mostVotedAnecdote && `has ${maxPoints} vote(s)`}</p>
    </>
  );
}

export default App;
