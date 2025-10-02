"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AppShell from "@/app/components/AppShell";
import { Typography, Button, Box, Grid, Paper, MenuItem } from "@mui/material";
import { FormTextField, FormSelect } from "@/app/components/form";
import DataTable from "@/app/components/DataTable";

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

  const onSubmit = (data: LoanForm) => {
    console.log("Form data:", data);
  };

  return (
    <AppShell>
      <Typography variant="h3" gutterBottom>
        Préstamos
      </Typography>

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
    </AppShell>
  );
}
