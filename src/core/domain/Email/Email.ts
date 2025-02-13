import { Employee } from "../Employee";

export interface Email {
  sender: string;
  recipient: string;
  body: string;
  subject: string;
}

export class GreetingsEmail implements Email {
  readonly sender: string = "sender@here.com";
  readonly subject: string = "Happy Birthday!";
  readonly recipient: string;
  readonly body: string;

  constructor(employee: Employee) {
    this.recipient = employee.getEmail();
    this.body = `Happy Birthday, dear ${employee.getFirstName()}!`;
  }
}
