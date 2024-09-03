import { argumentParser } from "./utils";

export const calculateBMI = (height: number, weight: number): string => {
  const heightMeters = height / 100;
  const BMI = weight / heightMeters ** 2;

  if (BMI < 18.5) {
    return "Underweight";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    return "Normal";
  } else if (BMI > 24.9 && BMI <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = argumentParser(process.argv);
    console.log(calculateBMI(height, weight));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
