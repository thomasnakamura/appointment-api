import { z } from 'zod';

export const CreateClientSchema = z.object({
  userId: z.string().uuid(),
  phone: z.string().min(8, 'Telefone inválido'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos')
});

export type CreateClientDTO = z.infer<typeof CreateClientSchema>;

export const UpdateClientSchema = z.object({
  phone: z.string().min(8, 'Telefone inválido').optional(),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos').optional()
});

export type UpdateClientDTO = z.infer<typeof UpdateClientSchema>;
