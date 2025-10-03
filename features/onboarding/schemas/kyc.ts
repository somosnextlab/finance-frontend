import { z } from "zod";

// Función para validar archivos solo en el cliente
const createFileSchema = (message: string) => {
  if (typeof window === "undefined") {
    // En el servidor, usar any para evitar errores de SSR
    return z.any();
  }
  
  return z
    .instanceof(File, { message })
    .refine((file) => file.size <= 3 * 1024 * 1024, "Archivo muy grande (máx. 3MB)")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Solo se permiten imágenes JPG/PNG"
    );
};

export const kycSchema = z.object({
  dniFront: createFileSchema("Frente del DNI requerido"),
  dniBack: createFileSchema("Dorso del DNI requerido"),
  selfie: createFileSchema("Selfie requerida"),
});

export type KycData = z.infer<typeof kycSchema>;
