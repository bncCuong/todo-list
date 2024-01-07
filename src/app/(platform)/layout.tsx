/** @format */

import ModalProvider from '@/components/provider/modal-provider';
import QueryProvider from '@/components/provider/query-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const PlatfromLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ModalProvider />
        <Toaster /> {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatfromLayout;
