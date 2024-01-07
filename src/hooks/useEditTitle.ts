import { RefObject, useState } from 'react';

export const useEditTitle = (inputRef?: RefObject<HTMLInputElement>) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditting = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef) {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'escape') {
      disableEditing();
    }
  };

  return { isEditing, disableEditing, enableEditting, onKeyDown };
};
