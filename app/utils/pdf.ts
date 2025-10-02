// Utilidades para generación de PDFs
// TODO: Implementar generación real de PDFs en Etapa 1

export interface PDFDocument {
  title: string;
  content: string;
  metadata?: Record<string, string>;
}

export const generatePDF = async (_document: PDFDocument): Promise<Blob> => {
  // Stub para generación de PDF
  // TODO: Implementar con @react-pdf/renderer o pdf-lib
  throw new Error("Generación de PDF no implementada aún");
};

export const downloadPDF = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
