'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction } from 'react';

interface FormSubmitProps {
  children: React.ReactNode;
  className?: string;
  disable?: boolean;
  variant?: 'secondary' | 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'primary' | 'gradient';
  setProgress?: Dispatch<SetStateAction<number>>;
}

export const FormSubmit = ({ children, variant = 'primary', className, disable, setProgress }: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disable}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
      onClick={() => setProgress && setProgress(100)}
    >
      {children}
    </Button>
  );
};
