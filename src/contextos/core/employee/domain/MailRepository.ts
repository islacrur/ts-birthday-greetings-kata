import { Employee } from "./Employee";

export interface MailRepository {
  sendMail(employee: Employee, smtpHost: string, smtpPort: number): void;
}
