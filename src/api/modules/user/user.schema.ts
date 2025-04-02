import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  hour: z.string(),
  turn: z.string(),
  space: z.string(),
  modality: z.string(),
  role: z.string(),
});

