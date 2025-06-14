import { Employee } from "./Employee";
import { OurDate } from "./OurDate";

export interface EmployeeRepository {
  getEmployees(fileName: string, ourDate: OurDate): Employee[];
}
