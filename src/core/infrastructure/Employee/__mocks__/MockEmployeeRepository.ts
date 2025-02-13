import { Employee, EmployeeRepository } from "../../../../core/domain/Employee";
import { OurDate } from "../../../../core/domain/OurDate";

export const mockEmployeeRepository: EmployeeRepository = {
  listByBirthday: (date: OurDate) => {
    const allEmployees = [
      new Employee("John", "Doe", "2008/10/08", "john.doe@foobar.com"),
      new Employee("Jane", "Smith", "1973/03/15", "jane.smith@foobar.com"),
    ];

    return allEmployees.filter((employee) => employee.isBirthday(date));
  },
};
