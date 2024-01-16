'use client';
import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import _ from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeHolder?: string;
  className?: string;
}

const SearchInput = ({ className, placeHolder }: SearchInputProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = _.debounce((textSearch: string) => {
    const params = new URLSearchParams(searchParams);
    if (textSearch) {
      params.set('query', textSearch);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  const onSearchBoard = (e: ChangeEvent<HTMLInputElement>) => {
    const textSearch = e.target.value;
    textSearch.trim().toLowerCase();
    debounce(textSearch);
  };

  return (
    <div className="flex items-center relative">
      <Input
        className={cn('my-2 lg:max-w-[200px] shadow-sm text-black', className)}
        placeholder={placeHolder}
        type="text"
        onChange={(e) => onSearchBoard(e)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
};

export default SearchInput;
