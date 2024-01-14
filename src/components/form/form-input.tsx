'use client';

import { forwardRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormErrors } from './form-errors';
import LoadingBar from 'react-top-loading-bar';

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
    const [progress, setProgress] = useState(0);

    const { pending } = useFormStatus();
    useEffect(() => {
      if (pending) {
        console.log(pending);
        setProgress(100);
      }
    }, [pending]);
    return (
      <div className="space-y-2">
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
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
