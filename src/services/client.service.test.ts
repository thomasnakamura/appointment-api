import { clientService } from '../../src/services/client.service';
import prisma from '../../src/config/prisma';

jest.mock('../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    client: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe('Client Service', () => {
  it('should create a client', async () => {
    (prisma.client.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.client.create as jest.Mock).mockResolvedValue({ id: '123', userId: 'user123', phone: '12345678', cpf: '12345678901' });

    const result = await clientService.create('user123', '12345678', '12345678901');

    expect(prisma.client.findUnique).toHaveBeenCalled();
    expect(prisma.client.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id', '123');
  });

  it('should throw if client already exists', async () => {
    (prisma.client.findUnique as jest.Mock).mockResolvedValue({ id: '123' });

    await expect(clientService.create('user123', '12345678', '12345678901'))
      .rejects
      .toThrow('Cliente já cadastrado.');
  });
});
