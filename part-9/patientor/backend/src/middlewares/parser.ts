import { NextFunction, Request, Response } from "express";
import { NewPatientSchema } from "../utils";

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
