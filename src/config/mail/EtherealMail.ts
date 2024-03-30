import nomemailer from 'nodemailer';
import HandlebarsMailTemplete from './HandlebarsMailTemplete';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplete {
  file: string;
  variables: ITemplateVariables;
}

interface ISendMail {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  template: IParseMailTemplete;
}

class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    template,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplete();

    const account = await nomemailer.createTestAccount();

    const transporter = nomemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from.name,
        address: from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(template),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview url: %s', nomemailer.getTestMessageUrl(message));
  }
}

export default EtherealMail;
