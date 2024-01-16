'use client';

import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface FormCheckBoxProps {
  id: string;
  className?: string;
  title?: string;
}

const FormCheckBox = ({ id, className, title = 'Priority' }: FormCheckBoxProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const onActionHanler = (formData: FormData) => {
    const arrFiltter = formData.getAll('filter_priority');
    const params = new URLSearchParams(searchParams);
    if (arrFiltter.length > 0) {
      params.set('filter_priority', arrFiltter.join(','));
    } else if (arrFiltter.length === 0) {
      params.delete('filter_priority');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form action={onActionHanler} className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm ">{title}</h2>
        <Button variant="gradient" size="sm">
          Filter
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="filter_high">
            High
          </Label>
          <input id="filter_high" name="filter_priority" type="checkbox" className=" cursor-pointer" value="high" />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="filter_medium">
            Medium
          </Label>
          <input id="filter_medium" name="filter_priority" type="checkbox" className=" cursor-pointer" value="medium" />
        </div>
        <div className="flex my-1 gap-1 ">
          <Label className="text-neutral-500 text-xs  cursor-pointer" htmlFor="filter_low">
            Low
          </Label>
          <input id="filter_low" name="filter_priority" type="checkbox" className=" cursor-pointer" value="low" />
        </div>
      </div>
    </form>
  );
};

export default FormCheckBox;
