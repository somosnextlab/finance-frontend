"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Typography, Button, Box, Grid, Paper, MenuItem, Alert, Snackbar } from "@mui/material";
import { FormTextField, FormSelect } from "@/app/components/form";
import DataTable from "@/app/components/DataTable";
import { me, login, logout } from "@/service/auth";

const loanSchema = z.object({
  amount: z.string().min(1, "Monto requerido"),
  term: z.string().min(1, "Plazo requerido"),
  purpose: z.string().min(1, "Propósito requerido"),
});

type LoanForm = z.infer<typeof loanSchema>;

const mockLoans = [
  { id: 1, amount: "$50,000", term: "12 meses", purpose: "Consumo", status: "Activo" },
  { id: 2, amount: "$25,000", term: "6 meses", purpose: "Emergencia", status: "Pendiente" },
  { id: 3, amount: "$100,000", term: "24 meses", purpose: "Inversión", status: "Aprobado" },
];

const columns = [
  { key: "id" as keyof (typeof mockLoans)[0], header: "ID" },
  { key: "amount" as keyof (typeof mockLoans)[0], header: "Monto" },
  { key: "term" as keyof (typeof mockLoans)[0], header: "Plazo" },
  { key: "purpose" as keyof (typeof mockLoans)[0], header: "Propósito" },
  { key: "status" as keyof (typeof mockLoans)[0], header: "Estado" },
];

export default function LoansPage() {
  const { control, handleSubmit } = useForm<LoanForm>({
    resolver: zodResolver(loanSchema),
  });

  const [authStatus, setAuthStatus] = useState<string>("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" as "success" | "error" | "warning" | "info" });

  const onSubmit = (data: LoanForm) => {
    console.log("Form data:", data);
  };

  const handleAuthTest = async () => {
    try {
      const result = await me();
      setAuthStatus(`✅ Auth OK: ${JSON.stringify(result)}`);
      setSnackbar({ open: true, message: "Autenticación exitosa", severity: "success" });
    } catch (error: unknown) {
      const err = error as { message: string; status?: number };
      setAuthStatus(`❌ Auth Error: ${err.message} (${err.status})`);
      setSnackbar({ open: true, message: `Error: ${err.message}`, severity: "error" });
    }
  };

  const handleLogin = async () => {
    try {
      await login("test@example.com", "password");
      setAuthStatus("✅ Login exitoso");
      setSnackbar({ open: true, message: "Login exitoso", severity: "success" });
    } catch (error: unknown) {
      const err = error as { message: string };
      setAuthStatus(`❌ Login Error: ${err.message}`);
      setSnackbar({ open: true, message: `Error: ${err.message}`, severity: "error" });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthStatus("✅ Logout exitoso");
      setSnackbar({ open: true, message: "Logout exitoso", severity: "success" });
    } catch (error: unknown) {
      const err = error as { message: string };
      setAuthStatus(`❌ Logout Error: ${err.message}`);
      setSnackbar({ open: true, message: `Error: ${err.message}`, severity: "error" });
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Préstamos
      </Typography>

      {/* Smoke Test Panel */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
        <Typography variant="h6" gutterBottom>
          🔥 Smoke Test - Auth BFF
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button variant="outlined" onClick={handleAuthTest}>
            Test /me
          </Button>
          <Button variant="outlined" onClick={handleLogin}>
            Login Test
          </Button>
          <Button variant="outlined" onClick={handleLogout}>
            Logout Test
          </Button>
        </Box>
        {authStatus && (
          <Alert severity={authStatus.includes("✅") ? "success" : "error"}>
            {authStatus}
          </Alert>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Nuevo Préstamo
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormTextField
                    name="amount"
                    control={control}
                    label="Monto"
                    placeholder="Ingrese el monto"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormSelect name="term" control={control} label="Plazo">
                    <MenuItem value="">Seleccione plazo</MenuItem>
                    <MenuItem value="6">6 meses</MenuItem>
                    <MenuItem value="12">12 meses</MenuItem>
                    <MenuItem value="24">24 meses</MenuItem>
                  </FormSelect>
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    name="purpose"
                    control={control}
                    label="Propósito"
                    placeholder="Descripción del propósito"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Solicitar Préstamo
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Préstamos Activos
            </Typography>
            <DataTable
              columns={columns}
              rows={mockLoans}
              emptyText="No hay préstamos registrados"
            />
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
