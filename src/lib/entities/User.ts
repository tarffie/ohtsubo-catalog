import { z } from "zod";

export const UserSchema = z.object({
  id: z.bigint().optional(),
  firstName: z.string().min(1, "O primeiro nome é obrigatório"),
  lastName: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.string().email("Endereço de e-mail inválido"),
  phoneCountryCode: z.string().regex(/^\+\d{1,3}$/, {
    message:
      "Código do país inválido. Deve começar com '+' e ter 1 a 3 dígitos.",
  }),
  phoneNumber: z
    .string()
    .min(10, "O número de telefone deve ter pelo menos 10 caracteres"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
