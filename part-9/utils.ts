interface Values {
  height: number;
  weight: number;
}

interface ExercisesValues {
  target: number;
  hours: number[];
}

const isNumber = (arg: any): boolean => {
  return !isNaN(Number(arg));
};

export const argumentParser = (args: string[]): Values => {
  if (args.length > 4) throw new Error("Too many arguments");
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("You have to input numbers");
  }
};

export const argumentParserExercisesCalculator = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (isNumber(args[2]) && args.slice(3).every((arg) => isNumber(arg))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("You must input numbers.");
  }
};
