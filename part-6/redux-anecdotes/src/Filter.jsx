import { useDispatch } from "react-redux";
import { filter } from "./reducers/filterReducer";

function Filter() {
  const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter{" "}
      <input type="text" onChange={(e) => dispatch(filter(e.target.value))} />
    </div>
  );
}

export default Filter;
