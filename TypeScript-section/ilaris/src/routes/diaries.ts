import express from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";

const router = express.Router();
router.use(express.json());

router.get("/", (_req, res) => {
  const entries: NonSensitiveDiaryEntry[] =
    diaryService.getNonSensitiveEntries();
  res.json(entries);
});

router.post("/", (_req, res) => {
  res.send("Creating a new diary");
});

export default router;
