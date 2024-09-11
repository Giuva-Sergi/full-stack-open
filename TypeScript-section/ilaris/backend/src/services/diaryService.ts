import diaries from "../../data/entries";
import { DiaryEntry, NewDiaryObject, NonSensitiveDiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((entry) => entry.id === id);
  return entry;
};

const addDiary = (newObject: NewDiaryObject): DiaryEntry => {
  const newDiary = {
    ...newObject,
    id: Math.max(...diaries.map((entry) => entry.id)) + 1,
  };
  diaries.push(newDiary);
  return newDiary;
};

export default { getEntries, getNonSensitiveEntries, addDiary, findById };
