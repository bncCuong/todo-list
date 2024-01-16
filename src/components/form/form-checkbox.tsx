'use client';

import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

interface FormCheckBoxProps {
  id: string;
  className?: string;
  type: string;
  title?: string;
}

const FormCheckBox = ({ id, className, type, title = 'Priority' }: FormCheckBoxProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log(id);
  const onActionHanler = (formData: FormData) => {
    const arrFiltter = formData.getAll(id);
    const params = new URLSearchParams(searchParams);
    if (arrFiltter.length > 0) {
      params.set('priority', arrFiltter.join(','));
    } else if (arrFiltter.length === 0) {
      params.delete('priority');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form action={onActionHanler} className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm ">{title}</h2>
        {type === 'checkbox' && (
          <Button variant="gradient" size="sm">
            Filter
          </Button>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="high">
            High
          </Label>
          <input id="high" name="priority" type={type} className=" cursor-pointer" value="high" />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="medium">
            Medium
          </Label>
          <input id="medium" name="priority" type={type} className=" cursor-pointer" value="medium" />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="low">
            Low
          </Label>
          <input id="low" name="priority" type={type} className=" cursor-pointer" value="low" />
        </div>
      </div>
    </form>
  );
};

export default FormCheckBox;
