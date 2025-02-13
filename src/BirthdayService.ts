import nodemailer from "nodemailer";
import { OurDate } from "./core/OurDate/domain/OurDate";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { fileEmployeeRepository } from "./core/Employee/infrastructure/FileEmployeeRepository";

export class BirthdayService {
  sendGreetings(
    _: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const employees = fileEmployeeRepository.list();

    employees.forEach((employee) => {
      if (employee.isBirthday(ourDate)) {
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
