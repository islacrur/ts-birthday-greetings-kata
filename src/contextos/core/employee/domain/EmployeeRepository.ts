import { Employee } from "./Employee";

export interface EmployeeRepository {
  getEmployees(fileName: string): Employee[];
}
