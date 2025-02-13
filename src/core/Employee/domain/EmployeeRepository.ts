import { Employee } from "./Employee";

export interface EmployeeRepository {
  list(): Employee[];
}
