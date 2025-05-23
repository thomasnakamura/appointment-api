import cron from 'node-cron';
import prisma from '../config/prisma';

export const notificationJob = cron.schedule('0 8 * * *', async () => {
  console.log('Verificando agendamentos para notificação...');

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const appointments = await prisma.appointment.findMany({
    where: {
      status: { in: ['pending', 'confirmed'] },
      date: new Date(today)
    }
  });

  for (const appt of appointments) {
    console.log(`Notificando usuário ${appt.clientId}: agendamento em ${appt.date.toISOString()} às ${appt.time}`);
  }
});
