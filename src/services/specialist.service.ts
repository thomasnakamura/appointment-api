import prisma from '../config/prisma';

export const specialistService = {
  create: async (userId: string, specialty: string, dailyLimit: number, minIntervalMinutes: number, availability: object) => {
    const existing = await prisma.specialist.findUnique({ where: { userId } });
    if (existing) throw new Error('Especialista já cadastrado.');

    return await prisma.specialist.create({
      data: { userId, specialty, dailyLimit, minIntervalMinutes, availability }
    });
  },

  findById: async (id: string) => {
    const specialist = await prisma.specialist.findUnique({ where: { id } });
    if (!specialist) throw new Error('Especialista não encontrado.');
    return specialist;
  },

  update: async (id: string, data: { specialty?: string; dailyLimit?: number; minIntervalMinutes?: number; availability?: object }) => {
    return await prisma.specialist.update({ where: { id }, data });
  },

  delete: async (id: string) => {
    await prisma.specialist.delete({ where: { id } });
  },

  updateAvailability: async (id: string, availability: object) => {
    return await prisma.specialist.update({
      where: { id },
      data: { availability }
    });
  },

  getAvailableSlots: async (specialty: string, date: Date) => {
    const specialists = await prisma.specialist.findMany({
      where: { specialty }
    });

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }).toLocaleLowerCase();

    const result = [];

    for (const specialist of specialists) {
      const available = (specialist.availability as any)[dayOfWeek] || [];

      const occupiedAppointments = await prisma.appointment.findMany({
        where: {
          specialistId: specialist.id,
          date
        }
      });

      const occupiedTimes = occupiedAppointments.map((a: any) => a.time);

      const freeSlots = available.filter((slot: string) => !occupiedTimes.includes(slot));

      result.push({
        specialistId: specialist.id,
        specialty: specialist.specialty,
        availableSlots: freeSlots
      });
    }

    return result;
  },
};
