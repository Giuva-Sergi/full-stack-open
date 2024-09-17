import { z } from "zod";
import { HealthCheckRating } from "./types";

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const BaseEntrySchemaNoID = BaseEntrySchema.omit({ id: true });

const HealthCheckEntry = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HealthCheckEntryWithoutID = BaseEntrySchemaNoID.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const OccupationalHealthcareEntry = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const OccupationalHealthcareEntryWithoutID = BaseEntrySchemaNoID.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const HospitalEntry = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema.optional(),
});

const HospitalEntryWithoutID = BaseEntrySchemaNoID.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema.optional(),
});

export const EntrySchema = z.union([
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
]);

export const NewEntrySchema = z.union([
  HealthCheckEntryWithoutID,
  OccupationalHealthcareEntryWithoutID,
  HospitalEntryWithoutID,
]);
