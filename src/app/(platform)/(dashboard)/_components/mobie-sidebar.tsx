/** @format */
'use client';
import { useEffect, useState } from 'react';
import { useMobileSidebar } from '@/hooks/useMobileSideBar';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return <div>MobileSidebar</div>;
};

export default MobileSidebar;
