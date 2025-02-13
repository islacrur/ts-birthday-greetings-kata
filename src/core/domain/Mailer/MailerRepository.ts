import { Email } from "../Email";

export interface MailerRepository {
  send(sender: string, email: Email): Promise<void>;
}
