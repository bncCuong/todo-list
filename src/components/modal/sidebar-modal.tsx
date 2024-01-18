import { Skeleton } from '../ui/skeleton';
import ActionsModal from './action-modal';
import { CardWithList } from '../../../types';

interface SideBarModalProps {
  data: CardWithList;
  onClose: () => void;
}

const SideBarModal = ({ data, onClose }: SideBarModalProps) => {
  return (
    <div className="h-full px-2">
      <ActionsModal data={data} onClose={onClose} />
    </div>
  );
};

export default SideBarModal;

SideBarModal.Skeleton = function SideBarSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
