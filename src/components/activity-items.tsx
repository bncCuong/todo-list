import { format } from 'date-fns';
import { AuditLog } from '@prisma/client';

import { generateLogMessage } from '@/lib/generate-log-message';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2 ">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex items-center gap-1 min-w-[400px] lg:max-w-2xl text-sm text-muted-foreground ">
        <span className="font-semibold lowercase text-neutral-700">{data.userName}/</span>
        <span>{generateLogMessage(data)}/</span>
        <p className="text-xs text-muted-foreground">{format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
      </div>
    </li>
  );
};
