"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBMI = void 0;
var utils_1 = require("./utils");
var calculateBMI = function (height, weight) {
    var heightMeters = height / 100;
    var BMI = weight / Math.pow(heightMeters, 2);
    if (BMI < 18.5) {
        return "Underweight";
    }
    else if (BMI >= 18.5 && BMI <= 24.9) {
        return "Normal";
    }
    else if (BMI > 24.9 && BMI <= 29.9) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
};
exports.calculateBMI = calculateBMI;
if (require.main === module) {
    try {
        var _a = (0, utils_1.argumentParser)(process.argv), height = _a.height, weight = _a.weight;
        console.log((0, exports.calculateBMI)(height, weight));
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
