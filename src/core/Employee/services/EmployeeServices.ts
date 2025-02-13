import fs from "fs";
import path from "path";
import { Employee } from "../domain/Employee";

export const employeeServices = {
  list: (fileName: string) => {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../../../resources/${fileName}`),
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
