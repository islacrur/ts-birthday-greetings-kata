import fs from "fs";
import path from "path";
import { EmployeeRepository } from "src/core/domain/Employee/EmployeeRepository";
import { Employee } from "../domain/Employee/Employee";

export const fileEmployeeRepository: EmployeeRepository = {
  list: () => {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../../resources/employee_data.txt`),
      "UTF-8"
    );

    const lines = data.split(/\r?\n/);
    lines.shift();

    const employees: Employee[] = [];

    lines.forEach((line) => {
      const employeeData = line.split(", ");
      const employee = new Employee(
        employeeData[1],
        employeeData[0],
        employeeData[2],
        employeeData[3]
      );
      employees.push(employee);
    });

    return employees;
  },
};
