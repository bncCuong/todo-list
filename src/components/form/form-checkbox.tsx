'use client';

import { Label } from '../ui/label';

interface FormCheckBoxProps {
  id: string;
}

const FormCheckBox = ({ id }: FormCheckBoxProps) => {
  return (
    <div className="w-full ">
      <h2 className="font-semibold text-sm ">Priority</h2>
      <div className="flex justify-between">
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="medium">
            Medium
          </Label>
          <input id="medium" name="priority" type="radio" className=" cursor-pointer" value="medium" />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="high">
            High
          </Label>
          <input id="high" name="priority" type="radio" className=" cursor-pointer" value="high" />
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

export default FormCheckBox;
