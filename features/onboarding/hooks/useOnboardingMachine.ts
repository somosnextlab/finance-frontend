'use client';

import { useState, useCallback } from 'react';

export type StepStatus = 'idle' | 'valid' | 'invalid' | 'pending';

export interface OnboardingMachineState {
  current: number;
  statuses: Record<number, StepStatus>;
  canGo: (step: number) => boolean;
  mark: (step: number, status: StepStatus) => void;
  setCurrent: (step: number) => void;
  goNext: () => void;
  goBack: () => void;
  isComplete: boolean;
}

const TOTAL_STEPS = 5;

/**
 * Hook para manejar el estado del wizard de onboarding
 * @returns Estado y funciones de control del wizard
 */
export function useOnboardingMachine(): OnboardingMachineState {
  const [current, setCurrent] = useState(1);
  const [statuses, setStatuses] = useState<Record<number, StepStatus>>({
    1: 'idle',
    2: 'idle',
    3: 'idle',
    4: 'idle',
    5: 'idle',
  });

  // Marcar el estado de un paso
  const mark = useCallback((step: number, status: StepStatus) => {
    setStatuses(prev => ({
      ...prev,
      [step]: status,
    }));
  }, []);

  // Verificar si se puede ir a un paso específico
  const canGo = useCallback((to: number) => {
    if (to <= 1) return true;
    if (to > TOTAL_STEPS) return false;
    
    // Verificar que todos los pasos anteriores estén válidos
    for (let i = 1; i < to; i++) {
      if (statuses[i] !== 'valid') return false;
    }
    return true;
  }, [statuses]);

  // Ir al siguiente paso
  const goNext = useCallback(() => {
    if (current < TOTAL_STEPS && canGo(current + 1)) {
      setCurrent(prev => prev + 1);
    }
  }, [current, canGo]);

  // Ir al paso anterior
  const goBack = useCallback(() => {
    if (current > 1) {
      setCurrent(prev => prev - 1);
    }
  }, [current]);

  // Verificar si el onboarding está completo
  const isComplete = Object.values(statuses).every(status => status === 'valid');

  return {
    current,
    statuses,
    canGo,
    mark,
    setCurrent,
    goNext,
    goBack,
    isComplete,
  };
}
