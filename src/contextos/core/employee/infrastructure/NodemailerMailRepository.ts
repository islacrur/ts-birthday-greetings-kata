import { Employee } from "../domain/Employee";
import { MailRepository } from "../domain/MailRepository";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class NodemailerMailRepository implements MailRepository {
  sendMail(employee: Employee, smtpHost: string, smtpPort: number): void {
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
  } // made protected for testing :-(
  protected async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port });

    await transport.sendMail(msg);
  }
}
export interface Message extends SMTPTransport.Options, Mail.Options {}
