import { z } from "zod";
import { NewEntrySchema } from "./utils";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryObject = z.infer<typeof NewEntrySchema>;
