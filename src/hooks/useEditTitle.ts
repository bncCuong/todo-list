import { RefObject, useState } from 'react';

interface useEditProps {
  formRef: RefObject<HTMLFormElement>;
  inputRef: RefObject<HTMLInputElement>;
}

export const useEditTitle = ({ formRef, inputRef }: useEditProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditting = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  if (isEditing) {
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'escape') {
      disableEditing();
    }
  };

  // click outside chay func onsubmit
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  return { isEditing, disableEditing, enableEditting, onKeyDown, onBlur };
};
