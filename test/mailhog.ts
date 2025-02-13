/**
 * NO TOCAR.
 * Simula el almacén de mensajes que hace MailHog para eliminar la dependencia con MailHog/Docker.
 */

interface Message {
  Content: {
    Body: string;
    Headers: {
      Subject: string[];
      To: string[];
    };
  };
}

let messageStore: Message[] = [];

const wait = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

// Simula el servidor SMTP que captura los correos
const mockSmtpServer = {
  onMail: (mail: any) => {
    messageStore.push({
      Content: {
        Body: mail.text,
        Headers: {
          Subject: [mail.subject],
          To: mail.to,
        },
      },
    });
  },
};

export const startMailhog = async () => {
  // Simulamos el tiempo que tarda Docker en levantar el contenedor
  await wait(2000);
  messageStore = [];
  vi.spyOn(require("nodemailer"), "createTransport").mockReturnValue({
    sendMail: async (mail: any) => {
      // Simulamos latencia de red al enviar email
      await wait(100);
      mockSmtpServer.onMail(mail);
      return {};
    },
  });
};

export const stopMailHog = async () => {
  // Simulamos el tiempo que tarda Docker en detener el contenedor
  await wait(1000);
  vi.restoreAllMocks();
  messageStore = [];
};

export const messagesSent = async (): Promise<Message[]> => {
  // Simulamos el tiempo de respuesta de la API de MailHog
  await wait(200);
  return messageStore;
};
