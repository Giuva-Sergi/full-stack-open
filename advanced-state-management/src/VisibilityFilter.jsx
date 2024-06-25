import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "./reducers/filterReducer";

function VisibilityFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div>
      all{" "}
      <input
        type="radio"
        name="filter"
        checked={filter === "ALL"}
        onChange={() => dispatch(filterChange("ALL"))}
      />
      important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      nonimportant{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
    </div>
  );
}

export default VisibilityFilter;
