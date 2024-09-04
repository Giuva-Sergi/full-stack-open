"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercise = void 0;
var utils_1 = require("./utils");
var calculateExercise = function (dailyExerciseHours, targetAmount) {
    var success = false;
    var rating;
    var ratingDescription;
    var numberOfDays = dailyExerciseHours.length;
    var numberOfTrainingDays = dailyExerciseHours.filter(function (day) { return day !== 0; }).length;
    var arraySum = dailyExerciseHours.reduce(function (acc, currVal) {
        return acc + currVal;
    }, 0);
    var avgTime = arraySum / dailyExerciseHours.length;
    if (avgTime > targetAmount) {
        success = true;
        rating = 3;
        ratingDescription = "Very good!";
    }
    else if (avgTime < targetAmount && targetAmount - avgTime <= 0.5) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }
    else {
        rating = 1;
        ratingDescription = "you should work harder";
    }
    return {
        periodLength: numberOfDays,
        numberOfTrainingDays: numberOfTrainingDays,
        target: targetAmount,
        avgTime: avgTime,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
    };
};
exports.calculateExercise = calculateExercise;
if (require.main === module) {
    try {
        var _a = (0, utils_1.argumentParserExercisesCalculator)(process.argv), target = _a.target, hours = _a.hours;
        console.log((0, exports.calculateExercise)(hours, target));
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            process.exit(1);
        }
    }
}
