/**
 * Validadores y formateadores para datos argentinos
 */

/**
 * Formatea un CUIL con guiones
 * @param input - String con números del CUIL
 * @returns CUIL formateado como NN-NNNNNNNN-N
 */
export function formatCuil(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  return digits.replace(/^(\d{2})(\d{8})(\d{1}).*/, "$1-$2-$3");
}

/**
 * Valida un CUIL usando el algoritmo oficial
 * @param value - CUIL a validar (con o sin guiones)
 * @returns true si el CUIL es válido
 */
export function isValidCuil(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  
  // En desarrollo, permitir algunos CUILs de prueba
  if (process.env.NODE_ENV === 'development') {
    // Permitir CUILs que empiecen con 20, 23, 24, 25, 26, 27, 30, 33, 34
    const validPrefixes = ['20', '23', '24', '25', '26', '27', '30', '33', '34'];
    const prefix = digits.slice(0, 2);
    if (validPrefixes.includes(prefix)) {
      return true;
    }
  }
  
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const sum = weights.reduce((acc, weight, index) => 
    acc + weight * parseInt(digits[index]!, 10), 0
  );
  
  const mod = 11 - (sum % 11);
  const checkDigit = mod === 11 ? 0 : mod === 10 ? 9 : mod;
  
  return checkDigit === parseInt(digits[10]!, 10);
}

/**
 * Formatea un CBU con espacio
 * @param input - String con números del CBU
 * @returns CBU formateado como NNNNNNNN NNNNNNNNNNNNNN
 */
export function formatCbu(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 22);
  return digits.replace(/^(\d{8})(\d{14}).*/, "$1 $2");
}

/**
 * Valida un CBU argentino
 * @param value - CBU a validar (con o sin espacios)
 * @returns true si el CBU es válido
 */
export function isValidCbu(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 22) return false;
  
  // Validar primer bloque (8 dígitos)
  const firstBlock = digits.slice(0, 8);
  const firstWeights = [3, 1, 7, 9, 3, 1, 7, 9];
  const firstSum = firstWeights.reduce((acc, weight, index) => 
    acc + weight * parseInt(firstBlock[index]!, 10), 0
  );
  const firstCheck = (10 - (firstSum % 10)) % 10;
  
  if (firstCheck !== parseInt(firstBlock[7]!, 10)) return false;
  
  // Validar segundo bloque (14 dígitos)
  const secondBlock = digits.slice(8, 22);
  const secondWeights = [3, 1, 7, 9, 3, 1, 7, 9, 3, 1, 7, 9, 3, 1];
  const secondSum = secondWeights.reduce((acc, weight, index) => 
    acc + weight * parseInt(secondBlock[index]!, 10), 0
  );
  const secondCheck = (10 - (secondSum % 10)) % 10;
  
  return secondCheck === parseInt(secondBlock[13]!, 10);
}

/**
 * Formatea un número de teléfono argentino
 * @param input - String con números del teléfono
 * @returns Teléfono formateado
 */
export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 10);
  
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 8) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
}

/**
 * Valida un número de teléfono argentino
 * @param value - Teléfono a validar
 * @returns true si el teléfono es válido
 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  // Teléfonos argentinos: 10 dígitos, empezando con 2, 3, 4, 5, 6, 7, 8, 9
  return digits.length === 10 && /^[2-9]/.test(digits);
}
