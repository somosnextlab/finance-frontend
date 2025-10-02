// Configuración de internacionalización
// TODO: Implementar i18n completo en Etapa 1

export const defaultLocale = "es" as const;
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split("/");
  const locale = segments[1] as Locale;

  return locales.includes(locale) ? locale : defaultLocale;
};
