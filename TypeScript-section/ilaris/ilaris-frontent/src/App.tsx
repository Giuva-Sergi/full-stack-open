import { useEffect, useState } from "react";
import diaryServices from "./services/diaryServices";
import { DiaryEntry, NewDiary } from "./types";
import Diary from "./components/Diary";
import AddDiaryForm from "./components/AddDiaryForm";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function initializeData() {
      const data = await diaryServices.fetchDiaries();
      setDiaries(data);
      setIsLoading(false);
    }
    initializeData();
  }, []);

  function handleError(message: string, milliseconds: number) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, milliseconds);
  }

  async function handleSubmit(e: React.SyntheticEvent, data: NewDiary) {
    e.preventDefault();
    try {
      const newDiary = await diaryServices.addDiary(data);
      setDiaries([...diaries, newDiary]);
    } catch (error) {
      let errorMessage = "Error: ";
      if (axios.isAxiosError(error)) {
        const dataReceived: string = error.response?.data.error.at(0).received;
        const path: string = error.response?.data.error.at(0).path.at(0);
        if (dataReceived) {
          errorMessage += `Incorrect ${path}: ${dataReceived}`;
        } else {
          errorMessage += `Missing ${path} field`;
        }
      } else {
        console.log("unknown error");
      }
      handleError(errorMessage, 3000);
    }
  }

  return (
    <>
      <AddDiaryForm onHandleSubmit={handleSubmit} message={errorMessage} />
      <h2>Diary entries</h2>
      {isLoading && <div>loading...</div>}
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </>
  );
}

export default App;
