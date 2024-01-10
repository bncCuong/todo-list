'use client';

import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useActions';
import { stripeRedirect } from '../../../../../../../../actions/stripe-redirect';
import { error } from 'console';
import { toast } from 'sonner';
import { useProModal } from '@/hooks/useProModal';

const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button disabled={isLoading} variant="primary" onClick={onClick}>
      {isPro ? 'Manage subcription' : 'Upgrade to pro'}
    </Button>
  );
};

export default SubscriptionButton;
