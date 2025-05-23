import { z } from 'zod';

export const CreateSpecialistSchema = z.object({
  userId: z.string().uuid(),
  specialty: z.string().min(1, 'Especialidade é obrigatória'),
  dailyLimit: z.number().int().positive('Limite diário deve ser positivo'),
  minIntervalMinutes: z.number().int().positive('Intervalo mínimo deve ser positivo'),
  availability: z.record(z.string(), z.array(z.string()))
});

export type CreateSpecialistDTO = z.infer<typeof CreateSpecialistSchema>;

export const UpdateAvailabilitySchema = z.object({
  availability: z.record(z.string(), z.array(z.string()))
});

export type UpdateAvailabilityDTO = z.infer<typeof UpdateAvailabilitySchema>;
