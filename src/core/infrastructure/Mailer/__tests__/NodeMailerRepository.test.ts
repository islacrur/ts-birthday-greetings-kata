import { GreetingsEmail } from "@domain/Email";
import { nodeMailerRepository } from "../NodeMailerRepository";
import nodemailer from "nodemailer";
import { Employee } from "@domain/Employee";

jest.mock("nodemailer");

describe("NodeMailerRepository", () => {
  const mockSendMail = jest.fn();
  const mockCreateTransport = jest.fn(() => ({
    sendMail: mockSendMail,
  }));

  beforeEach(() => {
    (nodemailer.createTransport as jest.Mock).mockImplementation(
      mockCreateTransport
    );
    mockSendMail.mockClear();
    mockCreateTransport.mockClear();
  });

  it("debería configurar el transporte con los valores correctos", async () => {
    const employee = new Employee(
      "John",
      "Doe",
      "1990/01/01",
      "john.doe@example.com"
    );
    const email = new GreetingsEmail(employee);

    await nodeMailerRepository.send(email);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "127.0.0.1",
      port: 1025,
    });
  });

  it("debería enviar el email con los parámetros correctos", async () => {
    const employee = new Employee(
      "John",
      "Doe",
      "1990/01/01",
      "john.doe@example.com"
    );
    const email = new GreetingsEmail(employee);

    await nodeMailerRepository.send(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: "sender@here.com",
      to: ["john.doe@example.com"],
      subject: "Happy Birthday!",
      text: "Happy Birthday, dear John!",
    });
  });

  it("debería propagar errores del envío", async () => {
    const employee = new Employee(
      "John",
      "Doe",
      "1990/01/01",
      "john.doe@example.com"
    );
    const email = new GreetingsEmail(employee);

    mockSendMail.mockImplementationOnce(() => {
      throw new Error("Error de envío");
    });

    try {
      await nodeMailerRepository.send(email);
      fail("Debería haber lanzado un error");
    } catch (error) {
      expect(error.message).toBe("Error de envío");
    }
  });
});
