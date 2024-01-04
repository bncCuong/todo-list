/** @format */

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const PlatfromLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster /> {children}
    </ClerkProvider>
  );
};

export default PlatfromLayout;
