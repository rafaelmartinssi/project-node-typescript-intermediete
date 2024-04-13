import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomerRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakeCustomerRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    createCustomerService = new CreateCustomerService(fakeCustomerRepository);
  });
  it('should be able to create new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Rafael Martins',
      email: 'rafel@gmail.com',
    });
    expect(customer).toHaveProperty('id');
  });
  it('should not be able to create new customer with the same email', async () => {
    await createCustomerService.execute({
      name: 'Rafael Martins',
      email: 'rafel@gmail.com',
    });
    expect(
      createCustomerService.execute({
        name: 'Rafael Martins',
        email: 'rafel@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
