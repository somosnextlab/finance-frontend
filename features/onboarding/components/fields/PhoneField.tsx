'use client';

import React from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { formatPhone } from '../../util-validators';

interface PhoneFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export default function PhoneField<T extends FieldValues>({
  name,
  control,
  label = "Teléfono",
  required = false,
  disabled = false,
  helperText,
  ...textFieldProps
}: PhoneFieldProps<T> & Omit<TextFieldProps, 'name' | 'control'>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          onChange={(e) => field.onChange(formatPhone(e.target.value))}
          value={field.value ?? ""}
          inputMode="tel"
          placeholder="Ej: 351 6xx xxxx"
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message || helperText}
          required={required}
          disabled={disabled}
          fullWidth
          aria-label={label}
          aria-required={required}
          aria-invalid={!!fieldState.error}
          {...textFieldProps}
        />
      )}
    />
  );
}
