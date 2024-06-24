function Anecdote({ anecdote, onClickHandler }) {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={onClickHandler}>vote</button>
      </div>
    </div>
  );
}

export default Anecdote;
