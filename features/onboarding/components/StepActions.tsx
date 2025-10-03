'use client';

import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { ArrowBack, ArrowForward, Check } from '@mui/icons-material';

interface StepActionsProps {
  onBack?: () => void;
  onNext?: () => void;
  onConfirm?: () => void;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  isLoading?: boolean;
  isLastStep?: boolean;
  nextText?: string;
  backText?: string;
  confirmText?: string;
}

export default function StepActions({
  onBack,
  onNext,
  onConfirm,
  nextDisabled = false,
  backDisabled = false,
  isLoading = false,
  isLastStep = false,
  nextText = 'Siguiente',
  backText = 'Volver',
  confirmText = 'Confirmar y Enviar',
}: StepActionsProps) {
  const handleNext = () => {
    if (isLastStep && onConfirm) {
      onConfirm();
    } else if (onNext) {
      onNext();
    }
  };

  const isNextDisabled = nextDisabled || isLoading;
  const isBackDisabled = backDisabled || isLoading;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mt: 4,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={onBack}
        disabled={isBackDisabled}
        aria-label={backText}
        sx={{ minWidth: 120 }}
      >
        {backText}
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isLoading && (
          <CircularProgress size={20} />
        )}
        
        <Button
          variant="contained"
          endIcon={isLastStep ? <Check /> : <ArrowForward />}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label={isLastStep ? confirmText : nextText}
          sx={{ minWidth: 160 }}
        >
          {isLastStep ? confirmText : nextText}
        </Button>
      </Box>
    </Box>
  );
}
