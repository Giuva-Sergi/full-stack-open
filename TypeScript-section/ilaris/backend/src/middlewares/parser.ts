import { NewEntrySchema } from "../utils";
import { Request, Response, NextFunction } from "express";

export const newDiaryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
