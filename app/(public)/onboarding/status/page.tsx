'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Alert, 
  Button, 
  Card, 
  CardContent,
  CircularProgress,
  Chip
} from '@mui/material';
import { CheckCircle, Error, Schedule, Support } from '@mui/icons-material';

type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'in_progress';

interface ApplicationData {
  applicationId: string;
  status: ApplicationStatus;
  submittedAt: string;
  message?: string;
}

export default function OnboardingStatusPage() {
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carga de datos de la aplicación
    const loadApplicationData = async () => {
      try {
        setIsLoading(true);
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // En desarrollo, simular datos
        const mockData: ApplicationData = {
          applicationId: `APP-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
          message: 'Tu solicitud ha sido recibida y está siendo procesada.',
        };
        
        setApplicationData(mockData);
      } catch (err) {
        setError('Error cargando el estado de la aplicación');
        console.error('Error loading application data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplicationData();
  }, []);

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle color="success" />;
      case 'rejected':
        return <Error color="error" />;
      case 'in_progress':
        return <CircularProgress size={24} />;
      default:
        return <Schedule color="warning" />;
    }
  };

  const getStatusColor = (status: ApplicationStatus): 'success' | 'error' | 'warning' | 'info' => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'in_progress':
        return 'info';
      default:
        return 'warning';
    }
  };

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'in_progress':
        return 'En proceso';
      default:
        return 'Pendiente de revisión';
    }
  };

  const getNextSteps = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved':
        return [
          'Tu cuenta ha sido activada exitosamente',
          'Puedes acceder a todos los servicios',
          'Revisa tu email para más información'
        ];
      case 'rejected':
        return [
          'Revisa los motivos del rechazo',
          'Corrige la información solicitada',
          'Puedes volver a enviar tu solicitud'
        ];
      case 'in_progress':
        return [
          'Tu solicitud está siendo revisada',
          'Te notificaremos por email cuando esté lista',
          'El proceso puede tomar hasta 24 horas'
        ];
      default:
        return [
          'Tu solicitud ha sido recibida',
          'Será revisada por nuestro equipo',
          'Te notificaremos por email el resultado'
        ];
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!applicationData) {
    return (
      <Alert severity="warning" sx={{ mb: 3 }}>
        No se encontraron datos de la aplicación
      </Alert>
    );
  }

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {getStatusIcon(applicationData.status)}
            <Typography variant="h5" component="h1">
              Estado de tu Solicitud
            </Typography>
          </Box>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            ID de solicitud: {applicationData.applicationId}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Chip
              label={getStatusText(applicationData.status)}
              color={getStatusColor(applicationData.status)}
              variant="filled"
            />
            <Typography variant="body2" color="text.secondary">
              Enviada el {new Date(applicationData.submittedAt).toLocaleDateString('es-AR')}
            </Typography>
          </Box>

          {applicationData.message && (
            <Alert severity="info" sx={{ mb: 3 }}>
              {applicationData.message}
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Próximos pasos
          </Typography>
          
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {getNextSteps(applicationData.status).map((step, index) => (
              <Typography 
                key={index} 
                component="li" 
                variant="body2" 
                sx={{ mb: 1 }}
              >
                {step}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
        >
          Volver al Inicio
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Support />}
          onClick={() => {
            // En producción, esto abriría un chat de soporte o formulario de contacto
            alert('Funcionalidad de soporte en desarrollo');
          }}
        >
          Contactar Soporte
        </Button>
      </Box>
    </Box>
  );
}
