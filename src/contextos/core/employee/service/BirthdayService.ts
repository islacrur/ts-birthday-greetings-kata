import { OurDate } from "../domain/OurDate";

import { EmployeeRepository } from "../domain/EmployeeRepository";
import { Employee } from "../domain/Employee";
import { MailRepository } from "../domain/MailRepository";

export class BirthdayService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private mailRepository: MailRepository
  ) {}

  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const listEmployeesByBirthday: Employee[] =
      this.employeeRepository.getEmployees(fileName, ourDate);

    listEmployeesByBirthday.forEach((employee) => {
      this.mailRepository.sendMail(employee, smtpHost, smtpPort);
    });
  }
}
