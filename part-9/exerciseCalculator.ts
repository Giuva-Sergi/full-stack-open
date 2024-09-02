type Success = 1 | 2 | 3;

interface SummaryResult {
  periodLength: number;
  numberOfTrainingDays: number;
  target: number;
  avgTime: number;
  success: boolean;
  rating: Success;
  ratingDescription: string;
}

const calculateExercise = (
  dailyExerciseHours: number[],
  targetAmount: number
): SummaryResult => {
  let success = false;
  let rating: Success;
  let ratingDescription;
  const numberOfDays = dailyExerciseHours.length;
  const numberOfTrainingDays = dailyExerciseHours.filter(
    (day) => day !== 0
  ).length;
  const arraySum = dailyExerciseHours.reduce((acc, currVal): number => {
    return acc + currVal;
  }, 0);
  const avgTime = arraySum / dailyExerciseHours.length;

  if (avgTime > targetAmount) {
    success = true;
    rating = 3;
    ratingDescription = "Very good!";
  } else if (avgTime < targetAmount && targetAmount - avgTime <= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
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

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 4));
