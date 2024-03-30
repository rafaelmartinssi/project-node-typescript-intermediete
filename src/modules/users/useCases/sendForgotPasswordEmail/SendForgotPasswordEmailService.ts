import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import EtherealMail from '@config/mail/EtherealMail';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email not found', 404);
    }

    const token = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTamplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: 'Equipe API vendas',
        email: 'equipe@apivendas.com.br',
      },
      subject: '[API vendas] - Recuperação de senha',
      template: {
        file: forgotPasswordTamplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
