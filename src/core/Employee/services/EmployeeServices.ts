import { fileEmployeeRepository } from "../infrastructure/FileEmployeeRepository";

export const employeeServices = {
  list: fileEmployeeRepository.list,
};
