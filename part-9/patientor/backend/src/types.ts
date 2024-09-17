import { z } from "zod";
import { NewPatientSchema } from "./utils";
import { EntrySchema, NewEntrySchema } from "./entryUtils";

export enum HealthCheckRating {
  "Healty" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;
