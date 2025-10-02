"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";

type Col<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: number | string;
};

/**
 * Componente de tabla de datos reutilizable con MUI Table
 * @param columns - Array de definiciones de columnas
 * @param rows - Array de datos a mostrar
 * @param loading - Estado de carga
 * @param emptyText - Texto cuando no hay datos
 */
export default function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  loading = false,
  emptyText = "Sin registros",
}: {
  columns: Col<T>[];
  rows: T[];
  loading?: boolean;
  emptyText?: string;
}) {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      {loading && <LinearProgress />}
      <Table size="small" aria-label="tabla">
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell key={String(c.key)} style={{ width: c.width }}>
                {c.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Box p={2}>
                  <Typography variant="body2" color="text.secondary">
                    {emptyText}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
          {rows.map((r, i) => (
            <TableRow key={i}>
              {columns.map((c) => (
                <TableCell key={String(c.key)}>
                  {c.render ? c.render(r) : String(r[c.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
