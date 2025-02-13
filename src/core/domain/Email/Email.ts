import { Employee } from "../Employee";

interface Email {
  recipient: string;
  body: string;
  subject: string;
}

export class GreetingsEmail implements Email {
  readonly recipient: string;
  readonly body: string;
  readonly subject: string;

  constructor(employee: Employee) {
    this.recipient = employee.getEmail();
    this.body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    );
    this.subject = "Happy Birthday!";
  }
}
