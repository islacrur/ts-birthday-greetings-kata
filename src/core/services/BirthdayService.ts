import { fileEmployeeRepository } from "../infrastructure/FileEmployeeRepository";
import { OurDate } from "../domain/OurDate";
import { Email } from "../domain/Email";
import { nodeMailerRepository } from "../infrastructure/NodeMailerRepository";

export class BirthdayService {
  sendGreetings(ourDate: OurDate) {
    const employees = fileEmployeeRepository.list();

    employees.forEach((employee) => {
      if (employee.isBirthday(ourDate)) {
        const email = new Email(employee);

        nodeMailerRepository.send("sender@here.com", email);
      }
    });
  }
}
