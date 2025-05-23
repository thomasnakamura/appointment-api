import prisma from '../config/prisma';
import { Status } from '../generated/prisma';

export const appointmentService = {
  create: async (clientId: string, scheduledById: string, specialistId: string, date: Date, time: string) => {
    const appointment = await prisma.appointment.create({
      data: {
        clientId,
        specialistId,
        scheduledById,
        date,
        time,
        status: 'pending'
      }
    });
    return appointment;
  },

  listByClient: async (clientId: string) => {
    return await prisma.appointment.findMany({ where: { clientId } });
  },

  updateStatus: async (id: string, status: Status) => {
    return await prisma.appointment.update({
      where: { id },
      data: { status }
    });
  },

  cancel: async (id: string, userId: string, userRole: string) => {
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new Error('Agendamento não encontrado.');

    if (appointment.clientId !== userId && userRole !== 'admin') {
      throw new Error('Você não tem permissão para cancelar este agendamento.');
    }

    const now = new Date();
    const appointmentDate = new Date(appointment.date);
    const hoursDiff = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDiff < 6) {
      throw new Error('Cancelamento só permitido com no mínimo 6 horas de antecedência.');
    }

    return await prisma.appointment.update({
      where: { id },
      data: { status: Status.cancelled }
    });
  },

  validateAvailability: async (specialistId: string, date: Date, time: string) => {
    const specialist = await prisma.specialist.findUnique({
      where: { id: specialistId }
    });

    if (!specialist) {
      throw new Error('Especialista não encontrado.');
    }

    const appointmentsToday = await prisma.appointment.count({
      where: {
        specialistId,
        date
      }
    });

    if (appointmentsToday >= specialist.dailyLimit) {
      throw new Error('Especialista atingiu o limite de atendimentos para o dia.');
    }

    // Verificar conflito de horário
    const conflict = await prisma.appointment.findFirst({
      where: {
        specialistId,
        date,
        time
      }
    });

    if (conflict) {
      throw new Error('Já existe um agendamento nesse horário.');
    }

    const recent = await prisma.appointment.findMany({
      where: {
        specialistId,
        date
      },
      orderBy: {
        time: 'desc'
      }
    });

    if (recent.length > 0) {
      const lastAppointment = recent[0];
      const [lastHour, lastMin] = lastAppointment.time.split(':').map(Number);
      const [newHour, newMin] = time.split(':').map(Number);

      const lastTotal = lastHour * 60 + lastMin;
      const newTotal = newHour * 60 + newMin;

      const diff = Math.abs(newTotal - lastTotal);

      if (diff < specialist.minIntervalMinutes) {
        throw new Error(`Intervalo mínimo de ${specialist.minIntervalMinutes} minutos não respeitado.`);
      }
    }
  },
};
