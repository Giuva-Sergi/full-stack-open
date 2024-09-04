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
export declare const calculateExercise: (dailyExerciseHours: number[], targetAmount: number) => SummaryResult;
export {};
