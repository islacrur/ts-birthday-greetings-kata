import { Employee } from "./Employee";

export interface MailRepository {
  sendMail(employee: Employee): void;
}
