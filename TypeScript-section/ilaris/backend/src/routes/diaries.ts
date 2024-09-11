import express, { Request, Response } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryObject, NonSensitiveDiaryEntry } from "../types";
import { newDiaryParser } from "../middlewares/parser";
import { errorHandler } from "../middlewares/errorHandler";

const router = express.Router();
router.use(express.json());

router.get("/", (_req, res) => {
  const entries: NonSensitiveDiaryEntry[] =
    diaryService.getNonSensitiveEntries();
  res.status(200).json(entries);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = diaryService.findById(id);

  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ error: "entry not found" });
  }
});

router.post(
  "/",
  newDiaryParser,
  (
    req: Request<unknown, unknown, NewDiaryObject>,
    res: Response<DiaryEntry>
  ) => {
    const addedEntry = diaryService.addDiary(req.body);
    return res.status(201).json(addedEntry);
  }
);

router.use(errorHandler);

export default router;
