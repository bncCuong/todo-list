import { XCircle } from 'lucide-react';

export const FormErrors = ({ id, errors }: { id: string; errors?: Record<string, string[] | undefined> }) => {
  if (!errors) return null;
  return (
    <div id={`${id}-error`} aria-live="polite" className=" mt-2 text-xs text-red-500">
      {errors?.[id]?.map((error) => {
        return (
          <div
            key={error}
            className="flex items-center border border-rose-500 font-medium p-2 bg-rose-500/10 rounded-sm"
          >
            <XCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        );
      })}
    </div>
  );
};
