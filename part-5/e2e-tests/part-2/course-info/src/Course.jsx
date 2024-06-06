function Course({ name, exercises }) {
  return (
    <li>
      <p>{`Title: ${name}`}</p>
      <p>{`Number of exercises: ${exercises}`}</p>
    </li>
  );
}

export default Course;
