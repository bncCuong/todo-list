'use client';
import React, { useEffect, useState } from 'react';
import CardModal from '../modal/card-modal';
import ProModal from '../modal/pro-modal';

const ModalProvider = () => {
  const [isMouted, setIsMouted] = useState(false);

  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMouted) return null;
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProvider;
