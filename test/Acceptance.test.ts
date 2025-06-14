import { FileEmployeeRepository } from "src/contextos/core/employee/infrastructure/FileEmployeeRepository";
import { OurDate } from "../src/contextos/core/employee/domain/OurDate";
import { BirthdayService } from "../src/contextos/core/employee/service/BirthdayService";
import { messagesSent, startMailhog, stopMailHog } from "./mailhog";
import flushPromises from "flush-promises";
import { EmployeeRepository } from "src/contextos/core/employee/domain/EmployeeRepository";
import { NodemailerMailRepository } from "src/contextos/core/employee/infrastructure/NodemailerMailRepository";
import { MailRepository } from "src/contextos/core/employee/domain/MailRepository";

describe("Acceptance", () => {
  const SMTP_PORT = 1025;
  const SMTP_URL = "127.0.0.1";
  let employeeRepository: EmployeeRepository;
  let mailRepository: MailRepository;
  let service: BirthdayService;

  beforeEach(async () => {
    await startMailhog();
    employeeRepository = new FileEmployeeRepository();
    mailRepository = new NodemailerMailRepository(SMTP_URL, SMTP_PORT);
    service = new BirthdayService(employeeRepository, mailRepository);
  });

  afterEach(async () => {
    await stopMailHog();
  });

  it("base scenario", async () => {
    service.sendGreetings(new OurDate("2008/10/08"));
    await flushPromises();

    const messages = await messagesSent();
    expect(messages.length).toEqual(1);
    const message = messages[0];
    expect(message.Content.Body).toEqual("Happy Birthday, dear John!");
    expect(message.Content.Headers.Subject[0]).toEqual("Happy Birthday!");
    const tos = message.Content.Headers.To;
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual("john.doe@foobar.com");
  });

  it("will not send emails when nobodys birthday", async () => {
    service.sendGreetings(new OurDate("2008/01/01"));
    await flushPromises();

    const messages = await messagesSent();
    expect(messages.length).toEqual(0);
  });
});
