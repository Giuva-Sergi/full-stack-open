import { z } from "zod";
import { Gender, NewPatient } from "./types";

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
      throw new Error("unkown enum type");
  }
};

export default toNewPatientEntry;
