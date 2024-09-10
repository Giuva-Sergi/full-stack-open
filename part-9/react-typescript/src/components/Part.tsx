import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

function Part({ coursePart }: PartProps) {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>{" "}
          <i>{coursePart.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>{" "}
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>{" "}
          <i>{coursePart.description}</i>{" "}
          <p>submit to {coursePart.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>{" "}
          <i>{coursePart.description}</i>{" "}
          <p>
            required skills:{" "}
            {coursePart.requirements.map((skill) => (
              <span>{skill} </span>
            ))}
          </p>
        </div>
      );
    default:
      assertNever(coursePart);
  }
}

export default Part;
