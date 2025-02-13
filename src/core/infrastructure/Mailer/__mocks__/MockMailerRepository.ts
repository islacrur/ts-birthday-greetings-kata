import { MailerRepository } from "../../../../core/domain/Mailer";
import { Mock } from "vitest";

export const createMockMailerRepository = (
  sendMailSpy: Mock
): MailerRepository => ({
  send: sendMailSpy,
});
