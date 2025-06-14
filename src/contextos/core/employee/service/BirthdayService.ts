import nodemailer from "nodemailer";
import { OurDate } from "../domain/OurDate";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { EmployeeRepository } from "../domain/EmployeeRepository";
import { Employee } from "../domain/Employee";

export class BirthdayService {
  sendMail(employee: Employee, smtpHost: string, smtpPort: number) {
    const recipient = employee.getEmail();
    const body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    );
    const subject = "Happy Birthday!";
    this.sendMessage(
      smtpHost,
      smtpPort,
      "sender@here.com",
      subject,
      body,
      recipient
    );
  }

  constructor(private employeeRepository: EmployeeRepository) {}
  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const listEmployeesByBirthday: Employee[] =
      this.employeeRepository.getEmployees(fileName, ourDate);
    listEmployeesByBirthday.forEach((employee) => {
      this.sendMail(employee, smtpHost, smtpPort);
    });
  }

  async sendMessage(
    smtpHost: string,
    smtpPort: number,
    sender: string,
    subject: string,
    body: string,
    recipient: string
  ) {
    const message = {
      host: smtpHost,
      port: smtpPort,
      from: sender,
      to: [recipient],
      subject,
      text: body,
    };

    this.deliveryMessage(message);
  }

  // made protected for testing :-(
  protected async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port });

    await transport.sendMail(msg);
  }
}

export interface Message extends SMTPTransport.Options, Mail.Options {}
