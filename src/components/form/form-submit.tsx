'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface FormSubmitProps {
  children: React.ReactNode;
  className?: string;
  disable?: boolean;
  variant?: 'secondary' | 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'primary';
}

export const FormSubmit = ({ children, variant, className, disable }: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending || disable} type="submit" variant={variant} size="sm" className={cn(className)}>
      {children}
    </Button>
  );
};
