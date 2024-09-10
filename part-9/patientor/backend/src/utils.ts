import { z } from "zod";
import { Gender, NewPatient } from "./types";

// const isString = (entry: unknown): entry is string => {
//   return typeof entry === "string";
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseString = (param: unknown): string => {
//   if (!param || !isString(param)) {
//     throw new Error("Field is missing or invalid: " + param);
//   }

//   return param;
// };

// const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error("Date is missing or invalid: " + date);
//   }

//   return date;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error("Gender is missing or invalid: " + gender);
//   }

//   return gender;
// };

const isNewPatient = (object: unknown): object is NewPatient => {
  return (
    typeof object === "object" &&
    object !== null &&
    "name" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  );
};

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!isNewPatient(object)) {
    throw new Error("Incorrect or missing data");
  }

  return NewPatientSchema.parse(object);
};

export const convertGender = (gender: string): Gender => {
  switch (gender.toLowerCase()) {
    case "male":
      return Gender.Male;
    case "female":
      return Gender.Female;
    case "other":
      return Gender.Other;
    default:
      throw new Error("unkown enum typ");
  }
};

export default toNewPatientEntry;
