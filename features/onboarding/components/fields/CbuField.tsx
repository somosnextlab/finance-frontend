'use client';

import React from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { formatCbu } from '../../util-validators';

interface CbuFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

export default function CbuField<T extends FieldValues>({
  name,
  control,
  label = "CBU",
  required = false,
  disabled = false,
  helperText,
  ...textFieldProps
}: CbuFieldProps<T> & Omit<TextFieldProps, 'name' | 'control'>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          onChange={(e) => field.onChange(formatCbu(e.target.value))}
          value={field.value ?? ""}
          inputMode="numeric"
          placeholder="NNNNNNNN NNNNNNNNNNNNNN"
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
