import React, { useState } from "react";
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
        <fieldset>
          date
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset>
          visibility
          <input
            type="radio"
            id="visibility"
            name="visibility"
            value="great"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="visibility">great</label>
          <input
            type="radio"
            id="visibility"
            name="visibility"
            value="good"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="visibility">good</label>
          <input
            type="radio"
            id="visibility"
            name="visibility"
            value="ok"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="visibility">ok</label>
          <input
            type="radio"
            id="visibility"
            name="visibility"
            value="poor"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="visibility">poor</label>
        </fieldset>
        <fieldset>
          weather
          <input
            type="radio"
            id="weather"
            name="weather"
            value="sunny"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="weather">sunny</label>
          <input
            type="radio"
            id="weather"
            name="weather"
            value="rainy"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="weather">rainy</label>
          <input
            type="radio"
            id="weather"
            name="weather"
            value="cloudy"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="weather">cloudy</label>
          <input
            type="radio"
            id="weather"
            name="weather"
            value="stormy"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="weather">stormy</label>
          <input
            type="radio"
            id="weather"
            name="weather"
            value="windy"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="weather">windy</label>
        </fieldset>
        <fieldset>
          comment
          <input
            type="text"
            id="comment"
            value={formData.comment}
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <button>Add diary</button>
      </form>
    </div>
  );
}

export default AddDiaryForm;
