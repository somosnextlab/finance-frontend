'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Alert } from '@mui/material';
import Stepper from '@/features/onboarding/components/Stepper';
import ContactStep from './steps/ContactStep';
import PersonalStep from './steps/PersonalStep';
import AddressStep from './steps/AddressStep';
import KycStep from './steps/KycStep';
import ReviewStep from './steps/ReviewStep';
import { useOnboardingMachine } from '@/features/onboarding/hooks/useOnboardingMachine';

interface StepPageProps {
  params: { step: string };
}

const stepComponents = {
  1: ContactStep,
  2: PersonalStep,
  3: AddressStep,
  4: KycStep,
  5: ReviewStep,
} as const;

export default function StepPage({ params }: StepPageProps) {
  const router = useRouter();
  const stepNumber = Number(params.step) || 1;
  const { canGo } = useOnboardingMachine();

  // Verificar que se pueda acceder al paso solicitado
  useEffect(() => {
    // En desarrollo, ser más permisivo con la navegación
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    
    if (!canGo(stepNumber)) {
      // Redirigir al primer paso si no se puede acceder
      router.replace('/onboarding/step/1');
    }
  }, [stepNumber, canGo, router]);

  // Verificar que el paso sea válido
  if (stepNumber < 1 || stepNumber > 5) {
    return (
      <Alert severity="error">
        Paso inválido. Redirigiendo al inicio...
      </Alert>
    );
  }

  // Si no se puede acceder al paso, no renderizar nada (excepto en desarrollo)
  if (process.env.NODE_ENV !== 'development' && !canGo(stepNumber)) {
    return null;
  }

  const StepComponent = stepComponents[stepNumber as keyof typeof stepComponents];

  if (!StepComponent) {
    return (
      <Alert severity="error">
        Componente de paso no encontrado.
      </Alert>
    );
  }

  return (
    <Box>
      <Stepper active={stepNumber} />
      <StepComponent />
    </Box>
  );
}
