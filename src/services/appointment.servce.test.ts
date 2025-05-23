import { appointmentService } from '../../src/services/appointment.service';
import prisma from '../../src/config/prisma';

jest.mock('../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    appointment: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      updateMany: jest.fn(),
      count: jest.fn()
    }
  }
}));

describe('Appointment Service', () => {
  it('should create an appointment', async () => {
    (prisma.appointment.create as jest.Mock).mockResolvedValue({ id: 'appt123' });

    const result = await appointmentService.create('clientId', 'scheduledById', 'specialistId', new Date(), '10:00');

    expect(prisma.appointment.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id', 'appt123');
  });
});
