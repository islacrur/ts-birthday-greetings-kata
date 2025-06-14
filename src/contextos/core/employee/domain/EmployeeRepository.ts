export interface EmployeeRepository {
  getEmployees(fileName: string): string[];
}
