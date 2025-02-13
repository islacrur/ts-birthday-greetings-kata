import { GreetingsEmail } from "../Email";

export interface MailerRepository {
  send(sender: string, email: GreetingsEmail): Promise<void>;
}
