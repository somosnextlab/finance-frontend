"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { PhotoCamera, Description, Person, CheckCircle } from "@mui/icons-material";
import { kycSchema, KycData } from "@/features/onboarding/schemas";
import { KycFiles } from "@/features/onboarding/ui/UppyKycUploader";
import { useDraftStorage } from "@/features/onboarding/hooks/useDraftStorage";
import { useOnboardingMachine } from "@/features/onboarding/hooks/useOnboardingMachine";
import { uploadKyc } from "@/features/onboarding/api/onboarding";
import StepActions from "@/features/onboarding/components/StepActions";
import UppyKycUploader from "@/features/onboarding/ui/UppyKycUploader";

export default function KycStep() {
  const router = useRouter();
  const { mark, goNext, goBack } = useOnboardingMachine();
  const [draft, setDraft, , isLoaded] = useDraftStorage<KycData>("onb.kyc", {
    dniFront: undefined,
    dniBack: undefined,
    selfie: undefined,
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    dniFront?: File;
    dniBack?: File;
    selfie?: File;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<KycData>({
    defaultValues: draft,
    resolver: zodResolver(kycSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    trigger,
  } = form;

  // Cargar datos del draft cuando esté listo
  useEffect(() => {
    if (isLoaded && draft.dniFront && draft.dniFront.size > 0) {
      form.reset(draft);
      setUploadedFiles(draft);
    }
  }, [isLoaded, draft, form]);

  // Marcar paso como válido cuando el formulario sea válido
  useEffect(() => {
    if (isValid) {
      mark(4, "valid");
    } else {
      mark(4, "invalid");
    }
  }, [isValid, mark, form.formState.errors]);

  const handleFilesUploaded = (files: KycFiles) => {
    const fileState = {
      dniFront: files.dniFront,
      dniBack: files.dniBack,
      selfie: files.selfie,
    };
    setUploadedFiles(fileState);
    setUploadError(null);

    // Actualizar el formulario
    if (files.dniFront) setValue("dniFront", files.dniFront);
    if (files.dniBack) setValue("dniBack", files.dniBack);
    if (files.selfie) setValue("selfie", files.selfie);

    // Trigger validation
    trigger();
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
  };

  const onSubmit = async (data: KycData) => {
    try {
      mark(4, "pending");
      setIsUploading(true);
      setUploadError(null);

      // Subir archivos
      await uploadKyc(data);

      // Guardar draft
      setDraft(data);

      mark(4, "valid");
      goNext();
      router.push("/onboarding/step/5");
    } catch (error) {
      console.error("Error in KYC step:", error);
      setUploadError("Error subiendo documentos. Intenta nuevamente.");
      mark(4, "invalid");
    } finally {
      setIsUploading(false);
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
    router.push("/onboarding/step/3");
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
        Documentos KYC
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sube los documentos requeridos para verificación
      </Typography>

      {errors.root && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.root.message}
        </Alert>
      )}

      {uploadError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {uploadError}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <UppyKycUploader
            onFiles={handleFilesUploaded}
            onError={handleUploadError}
            disabled={isUploading}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Requisitos de los documentos:
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Description color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="DNI: Frente y dorso claros, sin reflejos"
                    secondary="Formato JPG o PNG"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Selfie: Rostro visible, buena iluminación"
                    secondary="Formato JPG o PNG"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <PhotoCamera color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Tamaño máximo: 3MB por archivo"
                    secondary="Se comprimirán automáticamente"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {uploadedFiles && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Archivos subidos:
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {uploadedFiles.dniFront && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2">Frente DNI</Typography>
              </Box>
            )}

            {uploadedFiles.dniBack && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2">Dorso DNI</Typography>
              </Box>
            )}

            {uploadedFiles.selfie && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2">Selfie</Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <StepActions
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={!isValid || isSubmitting || isUploading}
        isLoading={isSubmitting || isUploading}
        nextText="Continuar"
      />
    </Box>
  );
}
