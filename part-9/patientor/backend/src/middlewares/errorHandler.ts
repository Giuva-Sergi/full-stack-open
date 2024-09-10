import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    console.log("PORCO DI DIO");
    next(error);
  }
};
