import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

// Formateo de fechas para la aplicación
export const formatDate = (date: string | Date, formatString = "dd/MM/yyyy"): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return "Fecha inválida";
    }

    return format(dateObj, formatString, { locale: es });
  } catch {
    return "Fecha inválida";
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, "dd/MM/yyyy HH:mm");
};

// Conversión de zonas horarias
export const toUTC = (date: Date, timeZone: string): Date => {
  return zonedTimeToUtc(date, timeZone);
};

export const fromUTC = (date: Date, timeZone: string): Date => {
  return utcToZonedTime(date, timeZone);
};

// Utilidades comunes
export const isToday = (date: string | Date): boolean => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};
