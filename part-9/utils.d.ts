interface BmiValues {
    height: number;
    weight: number;
}
interface ExercisesValues {
    target: number;
    hours: number[];
}
export declare const isNumber: (arg: any) => boolean;
export declare const argumentParser: (args: string[]) => BmiValues;
export declare const argumentParserExercisesCalculator: (args: string[]) => ExercisesValues;
export {};
