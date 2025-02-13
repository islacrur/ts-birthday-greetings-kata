import { fileEmployeeRepository } from "../FileEmployeeRepository";
import { OurDate } from "../../../../core/domain/OurDate";
import fs from "fs";
import path from "path";
import { Mock } from "vitest";

vi.mock("fs");
vi.mock("path");

describe("FileEmployeeRepository", () => {
  beforeEach(() => {
    const mockFileContent =
      "last_name, first_name, date_of_birth, email\n" +
      "Doe, John, 2008/10/08, john.doe@foobar.com\n" +
      "Smith, Jane, 1973/03/15, jane.smith@foobar.com";

    (fs.readFileSync as Mock).mockReturnValue(mockFileContent);
    (path.resolve as Mock).mockReturnValue("fake/path/employee_data.txt");
  });

  describe("listByBirthday", () => {
    it("debería devolver empleados que cumplen años en la fecha especificada", () => {
      const date = new OurDate("2008/10/08");
      const employees = fileEmployeeRepository.listByBirthday(date);

      expect(employees).toHaveLength(1);
      expect(employees[0].getFirstName()).toBe("John");
      expect(employees[0].getLastName()).toBe("Doe");
      expect(employees[0].getEmail()).toBe("john.doe@foobar.com");
    });

    it("debería devolver una lista vacía cuando nadie cumple años", () => {
      const date = new OurDate("2008/10/09");
      const employees = fileEmployeeRepository.listByBirthday(date);

      expect(employees).toHaveLength(0);
    });

    it("debería llamar a readFileSync con la ruta correcta", () => {
      const date = new OurDate("2008/10/08");
      fileEmployeeRepository.listByBirthday(date);

      expect(fs.readFileSync).toHaveBeenCalledWith(
        "fake/path/employee_data.txt",
        "UTF-8"
      );
    });

    it("debería manejar un archivo vacío", () => {
      (fs.readFileSync as Mock).mockReturnValue(
        "last_name, first_name, date_of_birth, email"
      );

      const date = new OurDate("2008/10/08");
      const employees = fileEmployeeRepository.listByBirthday(date);

      expect(employees).toHaveLength(0);
    });
  });
});
