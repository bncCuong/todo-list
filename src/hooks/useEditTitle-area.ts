import { RefObject, useState } from 'react';

export const useEditTitleArea = (areaRef: RefObject<HTMLTextAreaElement>) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditting = () => {
    setIsEditing(true);
    setTimeout(() => {
      areaRef.current?.focus();
      areaRef.current?.select();
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'escape') {
      disableEditing();
    }
  };

  return { isEditing, disableEditing, enableEditting, onKeyDown };
};
