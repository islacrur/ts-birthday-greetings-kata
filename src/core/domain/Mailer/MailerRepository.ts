import { Email } from "../Email";

export interface MailerRepository {
  send(email: Email): Promise<void>;
}
