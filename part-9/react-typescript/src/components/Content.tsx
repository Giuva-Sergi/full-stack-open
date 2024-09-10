import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: Array<CoursePart>;
}

function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part key={i} coursePart={part} />
      ))}
    </>
  );
}

export default Content;
