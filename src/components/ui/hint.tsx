import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: 'top' | 'left' | 'bottom' | 'right';
  sideOffset?: number;
}

export const Hint = ({ children, description, side, sideOffset }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.5}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent sideOffset={sideOffset} side={side} className="text-xs max-w-[220px] break-words">
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
