"use client";
import { Controller, Control, FieldValues } from "react-hook-form";
import { FormControl, InputLabel, Select, FormHelperText, SelectProps } from "@mui/material";

export default function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  children,
  ...props
}: { name: keyof T & string; control: Control<T>; label: string } & SelectProps) {
  return (
    <Controller
      name={name as never}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>
          <Select label={label} {...field} {...props}>
            {children}
          </Select>
          {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
