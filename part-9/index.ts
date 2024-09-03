import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { isNumber } from "./utils";

const app = express();

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

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
