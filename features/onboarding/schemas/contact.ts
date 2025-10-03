import { z } from "zod";
import { isValidPhone } from "../util-validators";

export const contactSchema = z.object({
  email: z
    .string()
    .min(1, "Email requerido")
    .email("Formato de email inválido"),
  phone: z
    .string()
    .min(1, "Teléfono requerido")
    .refine(isValidPhone, "Teléfono argentino inválido (10 dígitos)"),
});

export type ContactData = z.infer<typeof contactSchema>;
