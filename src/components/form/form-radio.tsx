'use client';

import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface FormRadioProps {
  id: string;
  className?: string;
  title?: string;
}

const FormRadio = ({ id, className, title = 'Priority' }: FormRadioProps) => {
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
          <input id="high" name="priority" type="radio" className=" cursor-pointer" value="high" />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="medium">
            Medium
          </Label>
          <input id="medium" name="priority" type="radio" className=" cursor-pointer" value="medium" />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="low">
            Low
          </Label>
          <input id="low" name="priority" type="radio" className=" cursor-pointer" value="low" />
        </div>
      </div>
    </div>
  );
};

export default FormRadio;
