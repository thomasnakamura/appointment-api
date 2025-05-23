import cron from 'node-cron';
import prisma from '../config/prisma';

export const expireAppointmentsJob = cron.schedule('* * * * *', async () => {
  console.log('Verificando agendamentos expirados...');

  const now = new Date();

  const expired = await prisma.appointment.updateMany({
    where: {
      status: { in: ['pending', 'confirmed'] },
      date: { lt: now }
    },
    data: { status: 'expired' }
  });

  console.log(`${expired.count} agendamentos expirados atualizados.`);
});
