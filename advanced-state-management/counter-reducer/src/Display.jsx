import { useCounterContext } from "./context/CounterContext";

function Display() {
  const { state } = useCounterContext();
  return <div>{state}</div>;
}

export default Display;
