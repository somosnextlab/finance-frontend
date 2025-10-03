"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Alert, CircularProgress, Grid } from "@mui/material";
import { personalSchema, PersonalData } from "@/features/onboarding/schemas";
import { useDraftStorage } from "@/features/onboarding/hooks/useDraftStorage";
import { useOnboardingMachine } from "@/features/onboarding/hooks/useOnboardingMachine";
import StepActions from "@/features/onboarding/components/StepActions";
import CuilField from "@/features/onboarding/components/fields/CuilField";

export default function PersonalStep() {
  const router = useRouter();
  const { mark, goNext, goBack } = useOnboardingMachine();
  const [draft, setDraft, , isLoaded] = useDraftStorage<PersonalData>("onb.personal", {
    firstName: "",
    lastName: "",
    dni: "",
    cuil: "",
  });

  const form = useForm<PersonalData>({
    defaultValues: draft,
    resolver: zodResolver(personalSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = form;

  // Cargar datos del draft cuando esté listo
  useEffect(() => {
    if (isLoaded && draft.firstName) {
      form.reset(draft);
    }
  }, [isLoaded, draft, form]);

  // Marcar paso como válido cuando el formulario sea válido
  useEffect(() => {
    if (isValid) {
      mark(2, "valid");
    } else {
      mark(2, "invalid");
    }
  }, [isValid, mark]);

  const onSubmit = async (data: PersonalData) => {
    try {
      mark(2, "pending");

      // Guardar draft
      setDraft(data);

      mark(2, "valid");
      goNext();
      router.push("/onboarding/step/3");
    } catch (error) {
      console.error("Error in personal step:", error);
      mark(2, "invalid");
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
    router.push("/onboarding/step/1");
  };

  if (!isLoaded) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h2" gutterBottom>
        Datos Personales
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Información personal requerida para la verificación
      </Typography>

      {errors.root && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.root.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("firstName")}
            label="Nombre"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
            required
            aria-label="Nombre"
            aria-required="true"
            aria-invalid={!!errors.firstName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register("lastName")}
            label="Apellido"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
            required
            aria-label="Apellido"
            aria-required="true"
            aria-invalid={!!errors.lastName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register("dni")}
            label="DNI"
            placeholder="12345678"
            inputMode="numeric"
            error={!!errors.dni}
            helperText={errors.dni?.message}
            fullWidth
            required
            aria-label="DNI"
            aria-required="true"
            aria-invalid={!!errors.dni}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CuilField
            name="cuil"
            control={form.control}
            label="CUIL"
            placeholder="NN-NNNNNNNN-N"
            helperText="Tu CUIL de 11 dígitos"
            required
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
