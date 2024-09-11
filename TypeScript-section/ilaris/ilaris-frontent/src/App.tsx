import { useEffect, useState } from "react";
import diaryServices from "./services/diaryServices";
import { DiaryEntry, NewDiary } from "./types";
import Diary from "./components/Diary";
import AddDiaryForm from "./components/AddDiaryForm";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeData() {
      const data = await diaryServices.fetchDiaries();
      setDiaries(data);
      setIsLoading(false);
    }
    initializeData();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent, data: NewDiary) {
    e.preventDefault();
    const newDiary = await diaryServices.addDiary(data);
    setDiaries([...diaries, newDiary]);
  }

  return (
    <>
      <AddDiaryForm onHandleSubmit={handleSubmit} />
      <h2>Diary entries</h2>
      {isLoading && <div>loading...</div>}
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </>
  );
}

export default App;
