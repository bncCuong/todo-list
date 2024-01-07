'use client';
import React, { useEffect, useState } from 'react';
import CardModal from '../modal/card-modal';

const ModalProvider = () => {
  const [isMouted, setIsMouted] = useState(false);

  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMouted) return null;
  return (
    <>
      <CardModal />
    </>
  );
};

export default ModalProvider;
