import { Employee } from "./Employee";
import { OurDate } from "./OurDate";

export interface EmployeeRepository {
  getEmployees(ourDate: OurDate): Employee[];
}
