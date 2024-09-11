import { useState } from "react";
import { NewDiary } from "../types";
import ErrorMessage from "./ErrorMessage";

interface AddDiaryFormProps {
  onHandleSubmit: (e: React.SyntheticEvent, data: NewDiary) => void;
  message: string;
}

function AddDiaryForm({ onHandleSubmit, message }: AddDiaryFormProps) {
  const [formData, setFormData] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  function resetFormData() {
    setFormData({
      date: "",
      weather: "",
      visibility: "",
      comment: "",
    });
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {message && <ErrorMessage message={message} />}
      <form
        onSubmit={(e) => {
          onHandleSubmit(e, formData);
          resetFormData();
        }}
      >
        <div>
          date
          <input
            type="text"
            id="date"
            value={formData.date}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          weather
          <input
            type="text"
            id="weather"
            value={formData.weather}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          visibility
          <input
            type="text"
            id="visibility"
            value={formData.visibility}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          comment
          <input
            type="text"
            id="comment"
            value={formData.comment}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Add diary</button>
      </form>
    </div>
  );
}

export default AddDiaryForm;
