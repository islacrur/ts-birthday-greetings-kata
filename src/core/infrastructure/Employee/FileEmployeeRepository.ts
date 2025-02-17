import fs from "fs";
import path from "path";
import { EmployeeRepository } from "src/core/domain/Employee";
import { Employee } from "../../domain/Employee";
import { OurDate } from "../../domain/OurDate";

export const fileEmployeeRepository: EmployeeRepository = {
  listByBirthday: (date: OurDate) => {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../../../resources/employee_data.txt`),
      "UTF-8"
    );

    const lines = data.split(/\r?\n/);
    lines.shift();

    return lines
      .map((line) => {
        const [lastName, firstName, birthDate, email] = line.split(", ");
        return new Employee(firstName, lastName, birthDate, email);
      })
      .filter((employee) => employee.isBirthday(date));
  },
};
