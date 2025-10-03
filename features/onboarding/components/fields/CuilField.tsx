'use client';

import React from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { formatCuil } from '../../util-validators';

interface CuilFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export default function CuilField<T extends FieldValues>({
  name,
  control,
  label = "CUIL",
  required = false,
  disabled = false,
  helperText,
  ...textFieldProps
}: CuilFieldProps<T> & Omit<TextFieldProps, 'name' | 'control'>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          onChange={(e) => field.onChange(formatCuil(e.target.value))}
          value={field.value ?? ""}
          label={label}
          inputMode="numeric"
          placeholder="NN-NNNNNNNN-N"
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
