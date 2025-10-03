"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Alert, CircularProgress } from "@mui/material";
import { contactSchema, ContactData } from "@/features/onboarding/schemas";
import { useDraftStorage } from "@/features/onboarding/hooks/useDraftStorage";
import { useOnboardingMachine } from "@/features/onboarding/hooks/useOnboardingMachine";
import { startOnboarding } from "@/features/onboarding/api/onboarding";
import StepActions from "@/features/onboarding/components/StepActions";
import PhoneField from "@/features/onboarding/components/fields/PhoneField";

export default function ContactStep() {
  const router = useRouter();
  const { mark } = useOnboardingMachine();
  const [draft, setDraft, , isLoaded] = useDraftStorage<ContactData>("onb.contact", {
    email: "",
    phone: "",
  });

  const form = useForm<ContactData>({
    defaultValues: draft,
    resolver: zodResolver(contactSchema),
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
    if (isLoaded && draft.email) {
      form.reset(draft);
    }
  }, [isLoaded, draft, form]);

  // Marcar paso como válido cuando el formulario sea válido
  useEffect(() => {
    if (isValid) {
      mark(1, "valid");
    } else {
      mark(1, "invalid");
    }
  }, [isValid, mark]);

  const onSubmit = async (data: ContactData) => {
    try {
      mark(1, "pending");

      // Guardar draft
      setDraft(data);

      // Iniciar onboarding
      await startOnboarding(data);

      mark(1, "valid");
      router.replace("/onboarding/step/2");
    } catch (error) {
      console.error("Error in contact step:", error);
      mark(1, "invalid");
    }
  };

  const handleNext = () => {
    trigger().then((isValid) => {
      if (isValid) {
        handleSubmit(onSubmit)();
      }
    });
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
        Información de Contacto
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Necesitamos tus datos de contacto para comunicarnos contigo
      </Typography>

      {errors.root && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.root.message}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          {...register("email")}
          label="Email"
          type="email"
          placeholder="tu@email.com"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          required
          aria-label="Email"
          aria-required="true"
          aria-invalid={!!errors.email}
        />

        <PhoneField
          name="phone"
          control={form.control}
          label="Teléfono"
          placeholder="Ej: 351 6xx xxxx"
          helperText="Ingresa tu número de teléfono argentino (10 dígitos)"
          required
        />
      </Box>

      <StepActions
        onNext={handleNext}
        nextDisabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        nextText="Continuar"
      />
    </Box>
  );
}
