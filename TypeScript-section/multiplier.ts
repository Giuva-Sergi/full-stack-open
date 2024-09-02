const multiplicator = (a: number, b: number, plainText: string) => {
  console.log(plainText, a * b);
};

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers");
  }
};

// multiplicator(2, 3, "Two multiplied three is equal to:");
// multiplicator("how about a string", 3, "Multiply a string and 3 is equal to:"); // wrong type => won't compile

// Create a specific type

// console.log(calculator(2, 5, "divide"));
// console.log(calculator(2, 0, "divide"));
try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
