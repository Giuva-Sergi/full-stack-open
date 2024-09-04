"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argumentParserExercisesCalculator = exports.argumentParser = exports.isNumber = void 0;
var isNumber = function (arg) {
    return !isNaN(Number(arg));
};
exports.isNumber = isNumber;
var argumentParser = function (args) {
    if (args.length > 4)
        throw new Error("Too many arguments");
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if ((0, exports.isNumber)(args[2]) && (0, exports.isNumber)(args[3])) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    }
    else {
        throw new Error("You have to input numbers");
    }
};
exports.argumentParser = argumentParser;
var argumentParserExercisesCalculator = function (args) {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if ((0, exports.isNumber)(args[2]) && args.slice(3).every(function (arg) { return (0, exports.isNumber)(arg); })) {
        return {
            target: Number(args[2]),
            hours: args.slice(3).map(function (arg) { return Number(arg); }),
        };
    }
    else {
        throw new Error("You must input numbers.");
    }
};
exports.argumentParserExercisesCalculator = argumentParserExercisesCalculator;
