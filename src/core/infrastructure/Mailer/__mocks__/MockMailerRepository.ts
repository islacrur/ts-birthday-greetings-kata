import { MailerRepository } from "../../../../core/domain/Mailer";

export const createMockMailerRepository = (
  sendMailSpy: jest.Mock
): MailerRepository => ({
  send: sendMailSpy,
});
