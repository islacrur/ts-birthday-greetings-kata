import { BirthdayService } from "../../../../src/core/services/BirthdayService";
import { OurDate } from "../../../../src/core/domain/OurDate";
import { EmployeeRepository } from "../../../../src/core/domain/Employee/EmployeeRepository";
import { MailerRepository } from "../../../../src/core/domain/Mailer/MailerRepository";
import { Employee } from "../../../../src/core/domain/Employee";

describe("Acceptance", () => {
  let service: BirthdayService;
  let mockedEmployeeRepository: EmployeeRepository;
  let mockedMailerRepository: MailerRepository;
  let sendMailSpy: jest.Mock;

  beforeEach(async () => {
    mockedEmployeeRepository = {
      list: () => [
        new Employee("John", "Doe", "2008/10/08", "john.doe@foobar.com"),
        new Employee("Jane", "Smith", "1973/03/15", "jane.smith@foobar.com"),
      ],
    };

    sendMailSpy = jest.fn();
    mockedMailerRepository = {
      send: sendMailSpy,
    };

    service = new BirthdayService(
      mockedEmployeeRepository,
      mockedMailerRepository
    );
  });

  it("base scenario", async () => {
    service.sendGreetings(new OurDate("2008/10/08"));

    expect(sendMailSpy).toHaveBeenCalledTimes(1);
    expect(sendMailSpy).toHaveBeenCalledWith({
      body: "Happy Birthday, dear John!",
      recipient: "john.doe@foobar.com",
      sender: "sender@here.com",
      subject: "Happy Birthday!",
    });
  });

  it("will not send emails when nobodys birthday", async () => {
    service.sendGreetings(new OurDate("2008/01/01"));

    expect(sendMailSpy).not.toHaveBeenCalled();
  });
});
