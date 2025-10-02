// Utilidades para subida de archivos (KYC)
// TODO: Implementar subida real de archivos en Etapa 1

export interface UploadFile {
  file: File;
  type: "document" | "selfie" | "proof";
  metadata?: Record<string, string>;
}

export const uploadFile = async (_uploadFile: UploadFile): Promise<string> => {
  // Stub para subida de archivos
  // TODO: Implementar con @uppy/core o similar
  throw new Error("Subida de archivos no implementada aún");
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};
