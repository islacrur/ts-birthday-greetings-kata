import { BirthdayService } from "@services/BirthdayService";
import { OurDate } from "@domain/OurDate";
import { mockEmployeeRepository } from "@infrastructure/Employee/__mocks__/MockEmployeeRepository";
import { createMockMailerRepository } from "@infrastructure/Mailer/__mocks__/MockMailerRepository";

describe("Acceptance", () => {
  let service: BirthdayService;
  let sendMailSpy: jest.Mock;

  beforeEach(async () => {
    sendMailSpy = jest.fn();

    service = new BirthdayService(
      mockEmployeeRepository,
      createMockMailerRepository(sendMailSpy)
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
