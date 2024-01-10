import { useProModal } from '@/hooks/useProModal';
import { Dialog, DialogContent } from '../ui/dialog';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useAction } from '@/hooks/useActions';
import { stripeRedirect } from '../../../actions/stripe-redirect';
import { toast } from 'sonner';

const ProModal = () => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="image" className="object-cover" fill sizes="0" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-lg">Upgrade to Taskify Pro now</h2>
          <p className="text-xs font-semibold text-neutral-600 my-4 ">Explore the best of Taskify</p>
          <ul className="text-sm list-disc">
            <li>Unlimited board</li>
            <li>Advanced checklists</li>
            <li>Admin and security features </li>
            <li>And more...</li>
          </ul>
          <Button
            className="w-[50%] my-4 text-black font-bold"
            variant="primary"
            onClick={() => execute({})}
            disabled={isLoading}
          >
            Upgrade Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
