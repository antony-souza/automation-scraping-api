import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  role: z.string(),
  services: z.array(z.string()),
});

