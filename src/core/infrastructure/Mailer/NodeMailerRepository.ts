import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { Email } from "../../domain/Email";
import { MailerRepository } from "../../domain/Mailer";

const SMTP_HOST = "127.0.0.1";
const SMTP_PORT = 1025;

interface Message extends SMTPTransport.Options, Mail.Options {}

export const nodeMailerRepository: MailerRepository = {
  send: async (email: Email) => {
    const message: Message = {
      host: SMTP_HOST,
      port: SMTP_PORT,
      from: email.sender,
      to: [email.recipient],
      subject: email.subject,
      text: email.body,
    };

    await deliveryMessage(message);
  },
};

const deliveryMessage = async ({ host, port, ...msg }: Message) => {
  const transport = nodemailer.createTransport({ host, port });

  await transport.sendMail(msg);
};
