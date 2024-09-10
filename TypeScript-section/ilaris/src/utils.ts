import { z } from "zod";
import { NewDiaryObject, Visibility, Weather } from "./types";

// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isWeather = (param: string): param is Weather => {
//   return Object.values(Weather)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseComment = (comment: unknown): string | undefined => {
//   if (comment === undefined) {
//     return undefined;
//   }
//   if (!isString(comment)) {
//     throw new Error("Comment is not a string");
//   }

//   return comment;
// };

// const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date: " + date);
//   }

//   return date;
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!weather || !isString(weather) || !isWeather(weather)) {
//     throw new Error("Incorrect or missing weather: " + weather);
//   }
//   return weather;
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
//     throw new Error("Incorrect or missing visibility: " + visibility);
//   }
//   return visibility;
// };

const isNewDiaryObject = (object: unknown): object is NewDiaryObject => {
  return (
    typeof object === "object" &&
    object !== null &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  );
};

export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional(),
});

const toNewDiaryEntry = (object: unknown): NewDiaryObject => {
  if (!isNewDiaryObject(object)) {
    throw new Error("Incorrect or missing data");
  }
  // const newEntry: NewDiaryObject = {
  //   weather: z.nativeEnum(Weather).parse(object.weather),
  //   visibility: z.nativeEnum(Visibility).parse(object.visibility),
  //   date: z.string().date().parse(object.date),
  //   comment: z.string().optional().parse(object.comment),
  // };
  return NewEntrySchema.parse(object);
};

export default toNewDiaryEntry;
