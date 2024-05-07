const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  const { name, parts } = course;

  const sum = parts.reduce((acc, currPart) => currPart.exercises + acc, 0);
  console.log(sum);

  return (
    <>
      <Header title={name} />
      <ul>
        {parts.map((part) => (
          <Course key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </ul>
      <h3>total of {sum} exercises</h3>
    </>
  );
};

function Header({ title }) {
  return <h1>{title}</h1>;
}

function Course({ name, exercises }) {
  return (
    <li>
      <p>{`Title: ${name}`}</p>
      <p>{`Number of exercises: ${exercises}`}</p>
    </li>
  );
}

export default App;
