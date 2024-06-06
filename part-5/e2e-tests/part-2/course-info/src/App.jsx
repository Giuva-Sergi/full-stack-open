import Course from "./Course";
import Header from "./Header";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {courses.map((course) => {
        const { id: courseId, name, parts } = course;
        const total = parts.reduce(
          (acc, currPart) => currPart.exercises + acc,
          0
        );
        return (
          <div key={courseId}>
            <Header id={courseId} title={name} />
            <ul>
              {parts.map((part) => (
                <Course
                  key={part.id}
                  name={part.name}
                  exercises={part.exercises}
                />
              ))}
            </ul>
            <h3>total of {total} exercises</h3>
          </div>
        );
      })}
    </>
  );
};

export default App;
