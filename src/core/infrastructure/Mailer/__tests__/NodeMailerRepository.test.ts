import { GreetingsEmail } from "@domain/Email";
import { nodeMailerRepository } from "../NodeMailerRepository";
import nodemailer from "nodemailer";
import { Employee } from "@domain/Employee";

vi.mock("nodemailer");

describe("NodeMailerRepository", () => {
  let email: GreetingsEmail;
  const mockSendMail = vi.fn();
  const mockCreateTransport = vi.fn(() => ({
    sendMail: mockSendMail,
  }));

  beforeEach(() => {
    email = new GreetingsEmail(
      new Employee("John", "Doe", "1990/01/01", "john.doe@example.com")
    );
    (nodemailer.createTransport as vi.Mock).mockImplementation(
      mockCreateTransport
    );
    mockSendMail.mockClear();
    mockCreateTransport.mockClear();
  });

  it("debería configurar el transporte con los valores correctos", async () => {
    await nodeMailerRepository.send(email);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "127.0.0.1",
      port: 1025,
    });
  });

  it("debería enviar el email con los parámetros correctos", async () => {
    await nodeMailerRepository.send(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: "sender@here.com",
      to: ["john.doe@example.com"],
      subject: "Happy Birthday!",
      text: "Happy Birthday, dear John!",
    });
  });

  it("debería propagar errores del envío", async () => {
    mockSendMail.mockImplementationOnce(() => {
      throw new Error("Error de envío");
    });

    await expect(nodeMailerRepository.send(email)).rejects.toThrow(
      "Error de envío"
    );
  });
});
