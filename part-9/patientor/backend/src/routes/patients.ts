import express from "express";
import { NewPatient, NonSensitivePatientData, Patient } from "../types";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: NonSensitivePatientData[] = patientService.getAllPatients();
  res.send(data);
});

router.post("/", (req, res) => {
  try {
    const newPatientObject: NewPatient = toNewPatientEntry(req.body);
    const newPatient: Patient = patientService.addPatient(newPatientObject);
    return res.status(201).json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

export default router;
