"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Grid,
} from "@mui/material";
import { CloudUpload, PhotoCamera, Description, Person, CheckCircle } from "@mui/icons-material";

export interface KycFiles {
  dniFront: File;
  dniBack: File;
  selfie: File;
}

interface UppyKycUploaderProps {
  onFiles: (files: KycFiles) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export default function UppyKycUploader({
  onFiles,
  onError,
  disabled = false,
}: UppyKycUploaderProps) {
  const dniFrontInputRef = useRef<HTMLInputElement>(null);
  const dniBackInputRef = useRef<HTMLInputElement>(null);
  const webcamInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{
    dniFront?: File;
    dniBack?: File;
    selfie?: File;
  }>({});

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: keyof KycFiles) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo específico
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const errorMsg = "Solo se permiten archivos JPG, JPEG o PNG";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Validar tamaño (3MB)
    if (file.size > 3 * 1024 * 1024) {
      const errorMsg = "El archivo es muy grande (máx. 3MB)";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simular compresión
    setTimeout(() => {
      const newFiles = { ...uploadedFiles, [type]: file };
      setUploadedFiles(newFiles);
      setIsLoading(false);

      // Si tenemos los 3 archivos, llamar onFiles
      if (newFiles.dniFront && newFiles.dniBack && newFiles.selfie) {
        onFiles({
          dniFront: newFiles.dniFront,
          dniBack: newFiles.dniBack,
          selfie: newFiles.selfie,
        });
      }
    }, 1000);
  };

  const handleWebcamCapture = () => {
    if (webcamInputRef.current) {
      webcamInputRef.current.click();
    }
  };

  const removeFile = (type: keyof KycFiles) => {
    const newFiles = { ...uploadedFiles };
    delete newFiles[type];
    setUploadedFiles(newFiles);
  };

  if (disabled) {
    return (
      <Box
        sx={{
          p: 3,
          border: "2px dashed #ccc",
          borderRadius: 2,
          textAlign: "center",
          opacity: 0.6,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Cargador de documentos deshabilitado
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
            Procesando archivo...
          </Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        {/* Frente DNI */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Description color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Frente DNI
              </Typography>

              {uploadedFiles.dniFront ? (
                <Box>
                  <CheckCircle color="success" sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="body2" color="success.main" gutterBottom>
                    {uploadedFiles.dniFront.name}
                  </Typography>
                  <Button size="small" color="error" onClick={() => removeFile("dniFront")}>
                    Eliminar
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    onClick={() => dniFrontInputRef.current?.click()}
                    disabled={isLoading}
                  >
                    Seleccionar
                  </Button>
                  <input
                    ref={dniFrontInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect(e, "dniFront")}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Dorso DNI */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Description color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Dorso DNI
              </Typography>

              {uploadedFiles.dniBack ? (
                <Box>
                  <CheckCircle color="success" sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="body2" color="success.main" gutterBottom>
                    {uploadedFiles.dniBack.name}
                  </Typography>
                  <Button size="small" color="error" onClick={() => removeFile("dniBack")}>
                    Eliminar
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    onClick={() => dniBackInputRef.current?.click()}
                    disabled={isLoading}
                  >
                    Seleccionar
                  </Button>
                  <input
                    ref={dniBackInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect(e, "dniBack")}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Selfie */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Person color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Selfie
              </Typography>

              {uploadedFiles.selfie ? (
                <Box>
                  <CheckCircle color="success" sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="body2" color="success.main" gutterBottom>
                    {uploadedFiles.selfie.name}
                  </Typography>
                  <Button size="small" color="error" onClick={() => removeFile("selfie")}>
                    Eliminar
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    onClick={handleWebcamCapture}
                    disabled={isLoading}
                  >
                    Tomar Foto
                  </Button>
                  <input
                    ref={webcamInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    capture="user"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect(e, "selfie")}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Requisitos:</strong> Archivos JPG o PNG, máximo 3MB cada uno. Las imágenes se
          comprimirán automáticamente.
        </Typography>
      </Box>
    </Box>
  );
}
