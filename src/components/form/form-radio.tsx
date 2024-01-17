'use client';

import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { PRIORITY } from '@prisma/client';
import { useState } from 'react';

interface FormRadioProps {
  id: string;
  className?: string;
  title?: string;
  currentPriority?: PRIORITY | null;
}

const FormRadio = ({ id, className, title = 'Priority', currentPriority }: FormRadioProps) => {
  const [checked, setChecked] = useState(currentPriority);
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm ">{title}</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="high">
            High
          </Label>
          <input
            id="high"
            name="priority"
            type="radio"
            className=" cursor-pointer"
            value="high"
            checked={checked?.toLowerCase()?.includes('high')}
            onChange={() => setChecked(PRIORITY.HIGH)}
          />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="medium">
            Medium
          </Label>

          <input
            id="medium"
            name="priority"
            type="radio"
            className=" cursor-pointer"
            value="medium"
            checked={checked?.toLowerCase()?.includes('medium')}
            onChange={() => setChecked(PRIORITY.MEDIUM)}
          />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="low">
            Low
          </Label>
          <input
            id="low"
            name="priority"
            type="radio"
            className=" cursor-pointer"
            value="low"
            checked={checked?.toLowerCase()?.includes('low')}
            onChange={() => setChecked(PRIORITY.LOW)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormRadio;
