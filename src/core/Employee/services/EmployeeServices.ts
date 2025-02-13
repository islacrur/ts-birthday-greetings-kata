import { fileEmployeeRepository } from "../infrastructure/FileEmployeeRepository";

export const employeeServices = {
  list: () => {
    return fileEmployeeRepository.list();
  },
};
