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

const getPatientInfos = (patientId: string): Patient | undefined => {
  const patientInfos = patientsData.find((patient) => patient.id === patientId);
  if (!patientInfos) {
    throw new Error("Patient not found");
  }
  return patientInfos;
};

const addPatient = (object: NewPatient): Patient => {
  const newPatient: Patient = {
    ...object,
    id: uuidv4(),
    entries: [],
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default { getAllPatients, addPatient, getPatientInfos };
