import axios from "axios";
import { DiaryEntry, NewDiary } from "../types";

const BASE_URL = "/api/diaries";

const fetchDiaries = async () => {
  const res = await axios.get<DiaryEntry[]>(BASE_URL);
  return res.data;
};

const addDiary = async (object: NewDiary) => {
  const res = await axios.post<DiaryEntry>(BASE_URL, object);
  return res.data;
};

export default { fetchDiaries, addDiary };
