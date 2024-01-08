'use client';
import { useCardModal } from '@/hooks/useCardModal';
import { Dialog, DialogContent, DialogClose } from '../ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { CardWithList } from '../../../types';
import { fetcher } from '@/lib/fetcher';
import HeaderModal from './header-modal';
import { DescriptionModal } from './description-modal';
import ActionsModal from './action-modal';

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/card/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <HeaderModal data={cardData} onClose={onClose} /> : <HeaderModal.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 min-h-[300px]">
          <div className="col-span-3">
            <div className="w-full space-x-6">
              {!cardData ? <DescriptionModal.Skeleton /> : <DescriptionModal data={cardData} />}
            </div>
          </div>
          {cardData ? <ActionsModal data={cardData} onClose={onClose} /> : <ActionsModal.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
