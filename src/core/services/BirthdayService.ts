import { fileEmployeeRepository } from "../infrastructure/FileEmployeeRepository";
import { OurDate } from "../domain/OurDate";
import { GreetingsEmail } from "../domain/Email";
import { nodeMailerRepository } from "../infrastructure/NodeMailerRepository";

export class BirthdayService {
  sendGreetings(ourDate: OurDate) {
    const employees = fileEmployeeRepository.list();

    employees.forEach((employee) => {
      if (employee.isBirthday(ourDate)) {
        const greetingsEmail = new GreetingsEmail(employee);

        nodeMailerRepository.send(greetingsEmail);
      }
    });
  }
}
