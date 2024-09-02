// Create a specific type
type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;

    case "add":
      return a + b;

    case "divide":
      if (b === 0) {
        throw new Error("Can't divide by zero");
      }
      return a / b;
    default:
      throw new Error("Operation is not multiply, add or divide");
  }
};

const isOperation = (op: string): op is Operation => {
  return op === "multiply" || op == "divide" || op == "add";
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
const operation = process.argv[4];

if (!isOperation(operation)) {
  console.error("Operation not allowed");
  process.exit(1);
}

try {
  console.log(calculator(a, b, operation));
} catch (error: unknown) {
  let errorMessage = "Error message: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
}
