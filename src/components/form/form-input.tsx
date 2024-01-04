'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormErrors } from './form-errors';

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  require?: boolean;
  disable?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, className, defaultValue, disable, errors, label, onBlur, placeholder, require, type }, ref) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label htmlFor={id} className="text-neutral-700 text-xs font-semibold ">
              {label}
            </Label>
          ) : null}

          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={require}
            placeholder={placeholder}
            type={type}
            id={id}
            name={id}
            className={cn('text-sm px-2 py-1 h-7 outline-none', className)}
            disabled={pending || disable}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormInput.displayName = 'formInput';
