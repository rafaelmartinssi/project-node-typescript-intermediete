import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from './ResetPasswordService';

class ResetPasswordController {
  public async handle(request: Request, response: Response) {
    const { token, password } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      token,
      password,
    });

    return response.status(204).send();
  }
}

export default ResetPasswordController;
