import { NextFunction, Request, Response } from "express";
import { NewPatientSchema } from "../utils";
import { NewEntrySchema } from "../entryUtils";
import { Diagnosis, NewEntry } from "../types";

export const bodyParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const entryBodyParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const parseDiagnosisCode = (
  req: Request<unknown, unknown, NewEntry>,
  _res: Response,
  next: NextFunction
) => {
  const object = req.body;
  if (!("diagnosisCodes" in object)) {
    object.diagnosisCodes = [] as Array<Diagnosis["code"]>;
  }

  next();
};
