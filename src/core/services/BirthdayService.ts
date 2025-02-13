import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { fileEmployeeRepository } from "../infrastructure/FileEmployeeRepository";
import { OurDate } from "../domain/OurDate";
import { Email } from "../domain/Email/Email";

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
        const email = new Email(employee);

        this.sendMessage(
          smtpHost,
          smtpPort,
          "sender@here.com",
          email.subject,
          email.body,
          email.recipient
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
