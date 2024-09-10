interface ContentProps {
  courseName: string;
  exerciseCount: number;
}
function Content(props: ContentProps) {
  return (
    <p>
      {props.courseName} {props.exerciseCount}
    </p>
  );
}

export default Content;
