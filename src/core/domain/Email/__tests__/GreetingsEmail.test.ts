import { GreetingsEmail } from "../Email";
import { Employee } from "../../Employee";

describe("GreetingsEmail", () => {
  it("should create birthday email with correct properties", () => {
    const employee = new Employee(
      "John",
      "Doe",
      "1990/01/01",
      "employee@company.com"
    );

    const email = new GreetingsEmail(employee);

    expect(email.sender).toBe("sender@here.com");
    expect(email.subject).toBe("Happy Birthday!");
    expect(email.recipient).toBe("employee@company.com");
    expect(email.body).toBe("Happy Birthday, dear John!");
  });
});
