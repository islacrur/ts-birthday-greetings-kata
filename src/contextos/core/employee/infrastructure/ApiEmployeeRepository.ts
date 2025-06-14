import { EmployeeRepository } from "../domain/EmployeeRepository";
import fs from "fs";
import path from "path";

export class ApiEmployeeRepository implements EmployeeRepository {
  getEmployees(fileName: string): string[] {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../resources/${fileName}`),
      "UTF-8"
    );
    const lines = data.split(/\r?\n/);
    lines.shift();

    return lines;
  }
}
