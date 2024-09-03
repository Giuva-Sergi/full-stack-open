import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { isNumber } from "./utils";
import { calculateExercise } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!isNumber(height) || !isNumber(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBMI(Number(height), Number(weight));
  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi,
  });
});

interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

app.post("/exercises", (req, res) => {
  const { daily_exercises, target }: ExerciseRequestBody = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  } else if (
    !isNumber(target) ||
    !daily_exercises.every((number) => isNumber(number))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const summary = calculateExercise(daily_exercises, target);
  return res.status(200).json(summary);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
