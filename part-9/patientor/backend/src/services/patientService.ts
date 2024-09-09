import patientsData from "../../data/patients";
import { NewPatient, NonSensitivePatientData, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

const getAllPatients = (): NonSensitivePatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (object: NewPatient): Patient => {
  const newPatient: Patient = {
    ...object,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
  };
  patientsData.push(newPatient);
  // console.log(newPatient);
  return newPatient;
};

export default { getAllPatients, addPatient };
