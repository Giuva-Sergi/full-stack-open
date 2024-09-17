import express, { Request, Response } from "express";
import {
  NewEntry,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from "../types";
import patientService from "../services/patientService";
import {
  bodyParser,
  entryBodyParser,
  parseDiagnosisCode,
} from "../middlewares/parser";
import { errorHandler } from "../middlewares/errorHandler";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: NonSensitivePatientData[] = patientService.getAllPatients();
  res.send(data);
});

router.get("/:id", (req, res: Response<Patient>) => {
  const data = patientService.getPatientInfos(req.params.id);
  return res.status(200).json(data);
});

router.post(
  "/",
  bodyParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.addPatient(req.body);
    return res.status(201).json(newPatient);
  }
);

router.post(
  "/:id/entries",
  entryBodyParser,
  parseDiagnosisCode,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient>) => {
    const patientId = req.params.id;
    const data = patientService.addPatientEntry(patientId, req.body);
    return res.status(201).json(data);
  }
);

router.use(errorHandler);

export default router;
