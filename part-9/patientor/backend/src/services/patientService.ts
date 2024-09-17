import patients, { updatePatientEntries } from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const getAllPatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientInfos = (patientId: string): Patient | undefined => {
  const patientInfos = patients.find((patient) => patient.id === patientId);
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
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (patientId: string, object: NewEntry): Patient => {
  const patient = patients.find((patient) => patient.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const newEntry: Entry = {
    ...object,
    id: uuidv4(),
  };
  const newPatientObj = {
    ...patient,
    entries: [...patient.entries, newEntry],
  };

  updatePatientEntries(newPatientObj);

  return newPatientObj;
};

export default { getAllPatients, addPatient, getPatientInfos, addPatientEntry };
