import { nodeMailerRepository } from "../src/core/infrastructure/Mailer/NodeMailerRepository";
import { fileEmployeeRepository } from "../src/core/infrastructure/Employee/FileEmployeeRepository";
import { OurDate } from "../src/core/domain/OurDate";
import { BirthdayService } from "../src/core/services/BirthdayService";
import { messagesSent, startMailhog, stopMailHog } from "./mailhog";
import flushPromises from "flush-promises";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Acceptance", () => {
  let service: BirthdayService;

  beforeEach(async () => {
    await startMailhog();
    service = new BirthdayService(fileEmployeeRepository, nodeMailerRepository);
  });

  afterEach(async () => {
    await stopMailHog();
  });

  it("base scenario", async () => {
    service.sendGreetings(new OurDate("2008/10/08"));
    await flushPromises();

    const messages = await messagesSent();
    expect(messages.length).toEqual(1);
    const message = messages[0];
    expect(message.Content.Body).toEqual("Happy Birthday, dear John!");
    expect(message.Content.Headers.Subject[0]).toEqual("Happy Birthday!");
    const tos = message.Content.Headers.To;
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual("john.doe@foobar.com");
  });

  it("will not send emails when nobodys birthday", async () => {
    service.sendGreetings(new OurDate("2008/01/01"));
    await flushPromises();

    const messages = await messagesSent();
    expect(messages.length).toEqual(0);
  });
});
