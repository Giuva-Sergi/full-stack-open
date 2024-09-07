import express from "express";
import { NonSensitivePatientData } from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: NonSensitivePatientData[] = patientService.getAllPatients();
  res.send(data);
});

export default router;
