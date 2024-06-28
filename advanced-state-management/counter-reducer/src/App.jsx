import Button from "./Button";
import Display from "./Display";
import { useCounterContext } from "./context/CounterContext";

function App() {
  const { dispatch } = useCounterContext();

  return (
    <>
      <Display />
      <Button
        label={"-"}
        onHandleClick={() => dispatch({ type: "DECREASE" })}
      />
      <Button
        label={"RESET"}
        onHandleClick={() => dispatch({ type: "RESET" })}
      />
      <Button
        label={"+"}
        onHandleClick={() => dispatch({ type: "INCREASE" })}
      />
    </>
  );
}

export default App;
