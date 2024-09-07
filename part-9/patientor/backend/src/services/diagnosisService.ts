import { Diagnosis } from "../types";
import diagnosesEntries from "../../data/diagnoses";

const getDiagnosis = (): Diagnosis[] => {
  return diagnosesEntries;
};

export default { getDiagnosis };
