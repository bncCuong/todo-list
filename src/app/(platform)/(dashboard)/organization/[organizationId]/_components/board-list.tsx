import { FormPopover } from '@/components/form/form-popover';
import { Hint } from '@/components/ui/hint';
import { HelpCircle, User2 } from 'lucide-react';

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="w-6 h-6 mr-2" /> Your Board
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover side="right" sideOffset={10}>
          <div
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm"> Create new Board</p>
            <span className="text-xs">5 Remaining</span>
            <Hint
              side="bottom"
              sideOffset={40}
              description={`Free workspace can have up to 5 open board. For unlimited boards upgrade this workspace `}
            >
              <HelpCircle className="absolute bottom-1 right-1 h-3.5 w-3.5" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
