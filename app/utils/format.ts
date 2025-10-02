// Utilidades de formateo para la aplicación

export const formatCurrency = (amount: number, currency = "ARS"): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatNumber = (number: number, decimals = 2): string => {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

export const formatPercentage = (value: number, decimals = 2): string => {
  return `${formatNumber(value, decimals)}%`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Formato argentino: +54 9 11 1234-5678
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `+54 9 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11) {
    return `+54 9 ${cleaned.slice(1, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
