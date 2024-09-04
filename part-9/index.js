"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator");
var utils_1 = require("./utils");
var exerciseCalculator_1 = require("./exerciseCalculator");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/hello", function (_req, res) {
    res.send("Hello Full Stack!");
});
app.get("/bmi", function (req, res) {
    var _a = req.query, height = _a.height, weight = _a.weight;
    if (!(0, utils_1.isNumber)(height) || !(0, utils_1.isNumber)(weight)) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    var bmi = (0, bmiCalculator_1.calculateBMI)(Number(height), Number(weight));
    return res.json({
        height: Number(height),
        weight: Number(weight),
        bmi: bmi,
    });
});
app.post("/exercises", function (req, res) {
    var _a = req.body, daily_exercises = _a.daily_exercises, target = _a.target;
    if (!daily_exercises || !target) {
        return res.status(400).json({ error: "parameters missing" });
    }
    else if (!(0, utils_1.isNumber)(target) ||
        !daily_exercises.every(function (number) { return (0, utils_1.isNumber)(number); })) {
        return res.status(400).json({ error: "malformatted parameters" });
    }
    var summary = (0, exerciseCalculator_1.calculateExercise)(daily_exercises, target);
    return res.status(200).json(summary);
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on PORT: ".concat(PORT));
});
