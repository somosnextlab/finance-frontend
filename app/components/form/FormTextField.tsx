'use client';
import { Controller, Control, FieldValues } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export default function FormTextField<T extends FieldValues>({ name, control, ...props }: { name: keyof T & string; control: Control<T>; } & TextFieldProps) {
  return (
    <Controller
      name={name as never}
      control={control}
      render={({ field, fieldState }) => (
        <TextField {...field} {...props} error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
      )}
    />
  );
}
