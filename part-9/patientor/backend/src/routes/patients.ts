import express, { Request, Response } from "express";
import { NewPatient, NonSensitivePatientData, Patient } from "../types";
import patientService from "../services/patientService";
// import toNewPatientEntry from "../utils";
import { bodyParser } from "../middlewares/parser";
import { errorHandler } from "../middlewares/errorHandler";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: NonSensitivePatientData[] = patientService.getAllPatients();
  res.send(data);
});

router.post(
  "/",
  bodyParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.addPatient(req.body);
    return res.status(201).json(newPatient);
  }
);

router.use(errorHandler);

export default router;
