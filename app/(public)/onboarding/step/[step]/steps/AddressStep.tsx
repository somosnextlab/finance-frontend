'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  TextField, 
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { addressSchema, AddressData } from '@/features/onboarding/schemas';
import { useDraftStorage } from '@/features/onboarding/hooks/useDraftStorage';
import { useOnboardingMachine } from '@/features/onboarding/hooks/useOnboardingMachine';
import StepActions from '@/features/onboarding/components/StepActions';

export default function AddressStep() {
  const router = useRouter();
  const { mark, goNext, goBack } = useOnboardingMachine();
  const [draft, setDraft, , isLoaded] = useDraftStorage<AddressData>('onb.address', { 
    street: '', 
    number: '', 
    floor: '', 
    apartment: '', 
    city: '', 
    province: '', 
    postalCode: '' 
  });

  const form = useForm<AddressData>({
    defaultValues: draft,
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitting },
    trigger
  } = form;

  // Cargar datos del draft cuando esté listo
  useEffect(() => {
    if (isLoaded && draft.street) {
      form.reset(draft);
    }
  }, [isLoaded, draft, form]);

  // Marcar paso como válido cuando el formulario sea válido
  useEffect(() => {
    if (isValid) {
      mark(3, 'valid');
    } else {
      mark(3, 'invalid');
    }
  }, [isValid, mark]);

  const onSubmit = async (data: AddressData) => {
    try {
      mark(3, 'pending');
      
      // Guardar draft
      setDraft(data);
      
      mark(3, 'valid');
      goNext();
      router.push('/onboarding/step/4');
    } catch (error) {
      console.error('Error in address step:', error);
      mark(3, 'invalid');
    }
  };

  const handleNext = () => {
    trigger().then((isValid) => {
      if (isValid) {
        handleSubmit(onSubmit)();
      }
    });
  };

  const handleBack = () => {
    goBack();
    router.push('/onboarding/step/2');
  };

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" gutterBottom>
        Domicilio
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Dirección de residencia actual
      </Typography>

      {errors.root && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.root.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            {...register('street')}
            label="Calle"
            error={!!errors.street}
            helperText={errors.street?.message}
            fullWidth
            required
            aria-label="Calle"
            aria-required="true"
            aria-invalid={!!errors.street}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <TextField
            {...register('number')}
            label="Número"
            error={!!errors.number}
            helperText={errors.number?.message}
            fullWidth
            required
            aria-label="Número"
            aria-required="true"
            aria-invalid={!!errors.number}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('floor')}
            label="Piso (opcional)"
            fullWidth
            aria-label="Piso"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('apartment')}
            label="Departamento (opcional)"
            fullWidth
            aria-label="Departamento"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('city')}
            label="Ciudad"
            error={!!errors.city}
            helperText={errors.city?.message}
            fullWidth
            required
            aria-label="Ciudad"
            aria-required="true"
            aria-invalid={!!errors.city}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('province')}
            label="Provincia"
            error={!!errors.province}
            helperText={errors.province?.message}
            fullWidth
            required
            aria-label="Provincia"
            aria-required="true"
            aria-invalid={!!errors.province}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('postalCode')}
            label="Código Postal"
            placeholder="5000"
            inputMode="numeric"
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
            fullWidth
            required
            aria-label="Código Postal"
            aria-required="true"
            aria-invalid={!!errors.postalCode}
          />
        </Grid>
      </Grid>

      <StepActions
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        nextText="Continuar"
      />
    </Box>
  );
}
