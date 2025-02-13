import { fileEmployeeRepository } from "../FileEmployeeRepository";
import fs from "fs";
import path from "path";

vi.mock("fs");
vi.mock("path");

describe("FileEmployeeRepository", () => {
  beforeEach(() => {
    const mockFileContent =
      "last_name, first_name, date_of_birth, email\n" +
      "Doe, John, 2008/10/08, john.doe@foobar.com\n" +
      "Smith, Jane, 1973/03/15, jane.smith@foobar.com";

    (fs.readFileSync as vi.Mock).mockReturnValue(mockFileContent);
    (path.resolve as vi.Mock).mockReturnValue("fake/path/employee_data.txt");
  });

  describe("list", () => {
    it("debería leer y parsear correctamente el archivo de empleados", () => {
      const employees = fileEmployeeRepository.list();

      expect(employees).toHaveLength(2);
      expect(employees[0].getFirstName()).toBe("John");
      expect(employees[0].getLastName()).toBe("Doe");
      expect(employees[0].getEmail()).toBe("john.doe@foobar.com");

      expect(employees[1].getFirstName()).toBe("Jane");
      expect(employees[1].getLastName()).toBe("Smith");
      expect(employees[1].getEmail()).toBe("jane.smith@foobar.com");
    });

    it("debería llamar a readFileSync con la ruta correcta", () => {
      fileEmployeeRepository.list();

      expect(fs.readFileSync).toHaveBeenCalledWith(
        "fake/path/employee_data.txt",
        "UTF-8"
      );
    });

    it("debería manejar un archivo vacío", () => {
      (fs.readFileSync as vi.Mock).mockReturnValue(
        "last_name, first_name, date_of_birth, email"
      );

      const employees = fileEmployeeRepository.list();

      expect(employees).toHaveLength(0);
    });
  });
});
