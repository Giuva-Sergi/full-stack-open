const calculateBMI = (height: number, weight: number) => {
  const BMI = weight / (height * height);

  if (BMI < 18.5) {
    return "Underweight";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    return "Normal";
  } else if (BMI >= 25) {
    return "Overweight";
  }
};

console.log(calculateBMI(180, 74));
