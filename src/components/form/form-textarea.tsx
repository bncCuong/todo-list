import React, { KeyboardEventHandler, forwardRef } from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { FormErrors } from './form-errors';
import { useFormStatus } from 'react-dom';

interface FormTextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  require?: boolean;
  disable?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ id, onBlur, onClick, className, defaultValue, disable, errors, label, onKeyDown, placeholder, require }, ref) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
              {label}
            </Label>
          ) : null}

          <Textarea
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={require}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={disable || pending}
            className={cn(
              'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
              className,
            )}
            defaultValue={defaultValue}
            aria-describedby={`${id}-error`}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  },
);

FormTextArea.displayName = 'FormTextArea';
export default FormTextArea;
