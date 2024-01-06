import { ListWithCard } from '../../../../../../../types';
import { ListHeader } from './list-header';

export const ListItem = ({ data, index }: { data: ListWithCard; index: number }) => {
  return (
    <li className="shrink-0 w-[250px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};
