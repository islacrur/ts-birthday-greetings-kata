import { Employee, EmployeeRepository } from "../../../../core/domain/Employee";

export const mockEmployeeRepository: EmployeeRepository = {
  list: () => [
    new Employee("John", "Doe", "2008/10/08", "john.doe@foobar.com"),
    new Employee("Jane", "Smith", "1973/03/15", "jane.smith@foobar.com"),
  ],
};
