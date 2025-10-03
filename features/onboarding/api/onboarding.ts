import { apiFetch } from "@/app/service/api-client";
import { ContactData, PersonalData, AddressData, KycData } from "../schemas";

export interface StartOnboardingRequest {
  email: string;
  phone: string;
}

export interface StartOnboardingResponse {
  sessionId: string;
  userId?: string;
}

export interface OnboardingData {
  contact: ContactData;
  personal: PersonalData;
  address: AddressData;
  kyc: KycData;
}

export interface SubmitOnboardingRequest extends OnboardingData {
  sessionId: string;
}

export interface SubmitOnboardingResponse {
  success: boolean;
  applicationId: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
}

/**
 * Inicia el proceso de onboarding
 * @param data - Datos de contacto iniciales
 * @returns Respuesta con sessionId
 */
export const startOnboarding = async (
  data: StartOnboardingRequest,
): Promise<StartOnboardingResponse> => {
  try {
    // En desarrollo, saltar verificación de autenticación
    // En producción, verificar autenticación primero
    if (process.env.NODE_ENV === "production") {
      await apiFetch("/api/auth/me");
    }

    // Verificar salud del servicio
    await apiFetch("/api/health");

    // En desarrollo, simular creación de sesión
    // En producción, esto sería un POST a /api/onboarding/start
    console.log("Starting onboarding for:", data.email);
    return {
      sessionId: `dev-session-${Date.now()}`,
      userId: "dev-user-123",
    };
  } catch (error) {
    console.error("Error starting onboarding:", error);
    throw new Error("No se pudo iniciar el proceso de onboarding");
  }
};

/**
 * Sube un archivo KYC
 * @param file - Archivo a subir
 * @param type - Tipo de documento
 * @returns Respuesta de la subida
 */
export const uploadKycFile = async (
  file: File,
  type: "dniFront" | "dniBack" | "selfie",
): Promise<{ success: boolean; fileId?: string }> => {
  const formData = new FormData();
  formData.append("file", file, `${type}.jpg`);

  const response = await fetch("/api/kyc/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error subiendo ${type}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Sube todos los archivos KYC
 * @param files - Archivos KYC
 * @returns Respuesta de todas las subidas
 */
export const uploadKyc = async (
  files: KycData,
): Promise<{ success: boolean; results: { success: boolean; fileId?: string }[] }> => {
  try {
    const results = await Promise.all([
      uploadKycFile(files.dniFront, "dniFront"),
      uploadKycFile(files.dniBack, "dniBack"),
      uploadKycFile(files.selfie, "selfie"),
    ]);

    return {
      success: true,
      results,
    };
  } catch (error) {
    console.error("Error uploading KYC files:", error);
    throw new Error("Error subiendo documentos KYC");
  }
};

/**
 * Envía el onboarding completo
 * @param data - Datos completos del onboarding
 * @returns Respuesta de envío
 */
export const submitOnboarding = async (
  data: SubmitOnboardingRequest,
): Promise<SubmitOnboardingResponse> => {
  try {
    // En desarrollo, simular envío
    // En producción, esto sería un POST a /api/onboarding/submit
    console.log("Submitting onboarding data:", data);

    // Simular delay de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      applicationId: `app-${Date.now()}`,
      status: "pending",
      message: "Solicitud enviada correctamente",
    };
  } catch (error) {
    console.error("Error submitting onboarding:", error);
    throw new Error("Error enviando solicitud");
  }
};

/**
 * Obtiene el estado del onboarding
 * @param sessionId - ID de la sesión
 * @returns Estado actual del onboarding
 */
export const getOnboardingStatus = async (
  sessionId: string,
): Promise<{
  sessionId: string;
  status: string;
  currentStep: number;
  completedSteps: number[];
}> => {
  try {
    // En desarrollo, simular consulta de estado
    // En producción, esto sería un GET a /api/onboarding/status
    return {
      sessionId,
      status: "in_progress",
      currentStep: 1,
      completedSteps: [],
    };
  } catch (error) {
    console.error("Error getting onboarding status:", error);
    throw new Error("Error consultando estado del onboarding");
  }
};
