import { Employee } from "./Employee";
import { OurDate } from "../OurDate";

export interface EmployeeRepository {
  listByBirthday: (date: OurDate) => Employee[];
}
