'use client';
import { useCardModal } from '@/hooks/useCardModal';
import { Dialog, DialogContent, DialogClose } from '../ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { CardWithList } from '../../../types';
import { fetcher } from '@/lib/fetcher';
import HeaderModal from './header-modal';
import { DescriptionModal } from './description-modal';
import ActionsModal from './action-modal';
import { AuditLog } from '@prisma/client';
import { ActivityModal } from './activity-modal';
import SideBarModal from './sidebar-modal';

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/card/${id}`),
  });

  const { data: auditLog } = useQuery<AuditLog[]>({
    queryKey: ['card-logs', id],
    queryFn: () => fetcher(`/api/card/${id}/logs`),
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex justify-between ">
          <div className="flex-1 mr-4 ">
            {cardData ? <HeaderModal data={cardData} onClose={onClose} /> : <HeaderModal.Skeleton />}
            <div className="w-full space-y-2">
              {!cardData ? <DescriptionModal.Skeleton /> : <DescriptionModal data={cardData} />}
              {auditLog && auditLog.length > 0 ? <ActivityModal items={auditLog} /> : <ActivityModal.Skeleton />}
            </div>
          </div>
          {cardData ? <SideBarModal data={cardData} onClose={onClose} /> : <SideBarModal.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
