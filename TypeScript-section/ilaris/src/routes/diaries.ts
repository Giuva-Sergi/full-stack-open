import express from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";
import toNewDiaryEntry from "../utils";

const router = express.Router();
router.use(express.json());

router.get("/", (_req, res) => {
  const entries: NonSensitiveDiaryEntry[] =
    diaryService.getNonSensitiveEntries();
  res.json(entries);
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

router.post("/", (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    return res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error ${error.message}`;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

export default router;
