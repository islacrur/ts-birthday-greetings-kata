import { Employee } from "../Employee";

export class Email {
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
