"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Alert, CircularProgress, Card, CardContent, Grid } from "@mui/material";
import { Email, Person, Home, Description, CheckCircle } from "@mui/icons-material";
import { ContactData, PersonalData, AddressData, KycData } from "@/features/onboarding/schemas";
import { useDraftStorage } from "@/features/onboarding/hooks/useDraftStorage";
import { useOnboardingMachine } from "@/features/onboarding/hooks/useOnboardingMachine";
import { submitOnboarding } from "@/features/onboarding/api/onboarding";
import StepActions from "@/features/onboarding/components/StepActions";

export default function ReviewStep() {
  const router = useRouter();
  const { mark, goBack } = useOnboardingMachine();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Cargar todos los drafts
  const [contactDraft] = useDraftStorage<ContactData>("onb.contact", { email: "", phone: "" });
  const [personalDraft] = useDraftStorage<PersonalData>("onb.personal", {
    firstName: "",
    lastName: "",
    dni: "",
    cuil: "",
  });
  const [addressDraft] = useDraftStorage<AddressData>("onb.address", {
    street: "",
    number: "",
    floor: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [kycDraft] = useDraftStorage<KycData>("onb.kyc", {
    dniFront: undefined,
    dniBack: undefined,
    selfie: undefined,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Verificar que todos los drafts estén cargados
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      mark(5, "pending");

      // Preparar datos completos
      const onboardingData = {
        contact: contactDraft,
        personal: personalDraft,
        address: addressDraft,
        kyc: kycDraft,
        sessionId: `dev-session-${Date.now()}`,
      };

      // Enviar onboarding
      const result = await submitOnboarding(onboardingData);

      if (result.success) {
        mark(5, "valid");
        router.push("/onboarding/status");
      } else {
        throw new Error(result.message || "Error enviando solicitud");
      }
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      setSubmitError(error instanceof Error ? error.message : "Error enviando solicitud");
      mark(5, "invalid");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    goBack();
    router.push("/onboarding/step/4");
  };

  if (!isLoaded) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Revisión y Confirmación
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Verifica que toda la información sea correcta antes de enviar
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Información de Contacto */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Email color="primary" />
                <Typography variant="h6">Contacto</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Email:</strong> {contactDraft.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Teléfono:</strong> {contactDraft.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Datos Personales */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Person color="primary" />
                <Typography variant="h6">Datos Personales</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Nombre:</strong> {personalDraft.firstName} {personalDraft.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>DNI:</strong> {personalDraft.dni}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>CUIL:</strong> {personalDraft.cuil}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Domicilio */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Home color="primary" />
                <Typography variant="h6">Domicilio</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Dirección:</strong> {addressDraft.street} {addressDraft.number}
              </Typography>
              {(addressDraft.floor || addressDraft.apartment) && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {addressDraft.floor && `Piso ${addressDraft.floor}`}
                  {addressDraft.floor && addressDraft.apartment && ", "}
                  {addressDraft.apartment && `Depto ${addressDraft.apartment}`}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Ciudad:</strong> {addressDraft.city}, {addressDraft.province}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>CP:</strong> {addressDraft.postalCode}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Documentos */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Description color="primary" />
                <Typography variant="h6">Documentos</Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircle color="success" fontSize="small" />
                  <Typography variant="body2">Frente DNI</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircle color="success" fontSize="small" />
                  <Typography variant="body2">Dorso DNI</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircle color="success" fontSize="small" />
                  <Typography variant="body2">Selfie</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          Al confirmar, aceptas nuestros términos y condiciones y autorizas el procesamiento de tus
          datos personales.
        </Typography>
      </Box>

      <StepActions
        onBack={handleBack}
        onConfirm={handleSubmit}
        nextDisabled={isSubmitting}
        isLoading={isSubmitting}
        isLastStep={true}
        confirmText="Confirmar y Enviar"
      />
    </Box>
  );
}
