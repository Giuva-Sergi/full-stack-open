import patientsData from "../../data/patients";
import { NonSensitivePatientData } from "../types";

const getAllPatients = (): NonSensitivePatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getAllPatients };
