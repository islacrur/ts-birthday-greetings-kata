import { EmployeeRepository } from "../domain/Employee";
import { MailerRepository } from "../domain/Mailer";
import { OurDate } from "../domain/OurDate";
import { GreetingsEmail } from "../domain/Email";

export class BirthdayService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private mailerRepository: MailerRepository
  ) {}

  sendGreetings(ourDate: OurDate) {
    const employees = this.employeeRepository.list();

    employees.forEach((employee) => {
      if (employee.isBirthday(ourDate)) {
        const greetingsEmail = new GreetingsEmail(employee);

        this.mailerRepository.send(greetingsEmail);
      }
    });
  }
}
