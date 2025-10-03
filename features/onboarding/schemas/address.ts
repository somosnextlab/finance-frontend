import { z } from "zod";

export const addressSchema = z.object({
  street: z
    .string()
    .min(3, "Calle debe tener al menos 3 caracteres")
    .max(100, "Calle muy larga"),
  number: z
    .string()
    .min(1, "Número requerido")
    .max(10, "Número muy largo"),
  floor: z
    .string()
    .optional(),
  apartment: z
    .string()
    .optional(),
  city: z
    .string()
    .min(2, "Ciudad debe tener al menos 2 caracteres")
    .max(50, "Ciudad muy larga"),
  province: z
    .string()
    .min(2, "Provincia debe tener al menos 2 caracteres")
    .max(50, "Provincia muy larga"),
  postalCode: z
    .string()
    .min(1, "Código postal requerido")
    .regex(/^\d{4}$/, "Código postal debe tener 4 dígitos"),
});

export type AddressData = z.infer<typeof addressSchema>;
