/**
 * Datos de prueba para el onboarding
 * Estos datos son válidos y pueden usarse para testing
 */

export const mockContactData = {
  email: "test@example.com",
  phone: "351 123 4567",
};

export const mockPersonalData = {
  firstName: "Juan",
  lastName: "Pérez",
  dni: "12345678",
  cuil: "20-12345678-9",
};

export const mockAddressData = {
  street: "Av. Corrientes",
  number: "1234",
  floor: "5",
  apartment: "A",
  city: "Buenos Aires",
  province: "CABA",
  postalCode: "1043",
};

// Función para crear archivos mock solo en el cliente
const createMockFile = (name: string, type: string) => {
  if (typeof window === "undefined") {
    // En el servidor, retornar null
    return null;
  }
  return new File([], name, { type });
};

export const mockKycData = {
  dniFront: createMockFile("dni_front.jpg", "image/jpeg") as File | null,
  dniBack: createMockFile("dni_back.jpg", "image/jpeg") as File | null,
  selfie: createMockFile("selfie.jpg", "image/jpeg") as File | null,
};

export const mockOnboardingData = {
  contact: mockContactData,
  personal: mockPersonalData,
  address: mockAddressData,
  kyc: mockKycData,
};

// Datos adicionales para diferentes escenarios de prueba
export const mockUsers = [
  {
    id: "user-1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "351 123 4567",
    dni: "12345678",
    cuil: "20-12345678-9",
  },
  {
    id: "user-2", 
    name: "María González",
    email: "maria.gonzalez@example.com",
    phone: "351 987 6543",
    dni: "87654321",
    cuil: "27-87654321-0",
  },
  {
    id: "user-3",
    name: "Carlos López",
    email: "carlos.lopez@example.com", 
    phone: "351 555 1234",
    dni: "11223344",
    cuil: "23-11223344-9",
  },
];

// CUILs válidos para pruebas
export const validCuils = [
  "20-12345678-9",
  "23-11223344-9", 
  "24-22334455-0",
  "25-33445566-1",
  "26-44556677-2",
  "27-55667788-3",
  "30-66778899-4",
  "33-77889900-5",
  "34-88990011-6",
];

// Teléfonos argentinos válidos para pruebas
export const validPhones = [
  "351 123 4567",
  "351 987 6543",
  "351 555 1234",
  "11 1234 5678",
  "11 9876 5432",
  "341 123 4567",
  "261 987 6543",
  "221 555 1234",
];

// CBUs válidos para pruebas (si se necesitan)
export const validCbus = [
  "12345678 12345678901234",
  "87654321 98765432109876",
  "11223344 11223344556677",
];
