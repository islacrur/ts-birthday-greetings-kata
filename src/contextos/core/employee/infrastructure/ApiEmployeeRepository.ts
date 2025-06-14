import { EmployeeRepository } from "../domain/EmployeeRepository";
import { Employee } from "../domain/Employee";

import fs from "fs";
import path from "path";

export class ApiEmployeeRepository implements EmployeeRepository {
  getEmployees(fileName: string): Employee[] {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../resources/${fileName}`),
      "UTF-8"
    );
    const lines = data.split(/\r?\n/);
    lines.shift();
    const employeeArray: Employee[] = [];
    lines.forEach((line) => {
      const employeeData = line.split(", ");
      const employee = new Employee(
        employeeData[1],
        employeeData[0],
        employeeData[2],
        employeeData[3]
      );
      employeeArray.push(employee);
    });

    return employeeArray;
  }
}
