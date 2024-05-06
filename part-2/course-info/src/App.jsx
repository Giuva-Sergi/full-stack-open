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

  return (
    <>
      <Header title={name} />
      <ul>
        {parts.map((part) => (
          <Course key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </ul>
      {/* <Course course={course} />; */}
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
