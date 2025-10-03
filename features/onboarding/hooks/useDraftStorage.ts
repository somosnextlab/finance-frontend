'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Hook para manejar el almacenamiento local de drafts del onboarding
 * @param key - Clave única para el localStorage
 * @param initial - Valor inicial si no hay datos guardados
 * @returns [data, setData, clearData] - Estado y funciones de control
 */
export function useDraftStorage<T>(key: string, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos del localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed);
      }
    } catch (error) {
      console.warn(`Error loading draft from localStorage (${key}):`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.warn(`Error saving draft to localStorage (${key}):`, error);
      }
    }
  }, [key, data, isLoaded]);

  // Función para limpiar el draft
  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setData(initial);
    } catch (error) {
      console.warn(`Error clearing draft from localStorage (${key}):`, error);
    }
  }, [key, initial]);

  return [data, setData, clearData, isLoaded] as const;
}
