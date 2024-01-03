/** @format */
'use client';
import { useEffect, useState } from 'react';
import { useMobileSidebar } from '@/hooks/useMobileSideBar';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import Sidebar from './sidebar';

const MobileSidebar = () => {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathName, onClose]);
  if (!isMounted) return null;
  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        className="block md:hidden"
        size="sm"
      >
        <Menu className="w-4 h-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
