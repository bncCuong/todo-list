'use client';
import { useCardModal } from '@/hooks/useCardModal';
import { Dialog, DialogContent, DialogClose } from '../ui/dialog';

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>TEST</DialogContent>
    </Dialog>
  );
};

export default CardModal;
