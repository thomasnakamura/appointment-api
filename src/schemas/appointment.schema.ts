import { z } from 'zod';

export const CreateAppointmentSchema = z.object({
  specialistId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido, use YYYY-MM-DD'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido, use HH:MM')
});

export type CreateAppointmentDTO = z.infer<typeof CreateAppointmentSchema>;

export const UpdateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled', 'expired'])
});

export type UpdateStatusDTO = z.infer<typeof UpdateStatusSchema>;
