import express from "express";
import { Diagnosis } from "../types";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnosis: Diagnosis[] = diagnosisService.getDiagnosis();
  res.json(diagnosis);
});

export default router;
