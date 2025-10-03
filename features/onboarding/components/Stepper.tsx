'use client';

import React from 'react';
import { Stepper as MuiStepper, Step, StepLabel, Box, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

interface StepperProps {
  active: number;
  completed?: number[];
  steps?: string[];
}

const defaultSteps = [
  'Contacto',
  'Datos Personales', 
  'Domicilio',
  'Documentos KYC',
  'Revisión'
];

export default function Stepper({ 
  active, 
  completed = [], 
  steps = defaultSteps 
}: StepperProps) {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <MuiStepper 
        activeStep={active - 1} 
        alternativeLabel
        sx={{
          '& .MuiStepLabel-root': {
            '& .MuiStepLabel-label': {
              fontSize: '0.875rem',
              fontWeight: 500,
            },
            '& .MuiStepLabel-label.Mui-active': {
              fontWeight: 600,
              color: 'primary.main',
            },
            '& .MuiStepLabel-label.Mui-completed': {
              fontWeight: 600,
              color: 'success.main',
            },
          },
          '& .MuiStepConnector-root': {
            '& .MuiStepConnector-line': {
              borderColor: 'divider',
            },
            '&.Mui-active .MuiStepConnector-line': {
              borderColor: 'primary.main',
            },
            '&.Mui-completed .MuiStepConnector-line': {
              borderColor: 'success.main',
            },
          },
        }}
      >
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = completed.includes(stepNumber);
          const isActive = stepNumber === active;
          
          return (
            <Step key={label}>
              <StepLabel
                StepIconComponent={({ active, completed }) => {
                  if (completed) {
                    return <CheckCircle sx={{ color: 'success.main' }} />;
                  }
                  if (active) {
                    return <RadioButtonUnchecked sx={{ color: 'primary.main' }} />;
                  }
                  return <RadioButtonUnchecked sx={{ color: 'text.disabled' }} />;
                }}
                aria-label={`Paso ${stepNumber}: ${label}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: isActive ? 600 : isCompleted ? 600 : 400,
                    color: isActive ? 'primary.main' : isCompleted ? 'success.main' : 'text.secondary'
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </MuiStepper>
    </Box>
  );
}
