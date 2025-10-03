import { z } from "zod";
import { isValidCuil } from "../util-validators";

export const personalSchema = z.object({
  firstName: z
    .string()
    .min(2, "Nombre debe tener al menos 2 caracteres")
    .max(50, "Nombre muy largo"),
  lastName: z
    .string()
    .min(2, "Apellido debe tener al menos 2 caracteres")
    .max(50, "Apellido muy largo"),
  dni: z
    .string()
    .min(1, "DNI requerido")
    .regex(/^\d{7,8}$/, "DNI debe tener 7 u 8 dígitos"),
  cuil: z
    .string()
    .min(1, "CUIL requerido")
    .transform((v) => v.replace(/\D/g, ""))
    .refine(isValidCuil, "CUIL inválido"),
});

export type PersonalData = z.infer<typeof personalSchema>;
