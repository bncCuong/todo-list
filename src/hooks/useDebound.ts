import React, { useEffect } from 'react';
interface DeboundProps {
  func: () => void;
  time: number;
}
const useDebound = ({ func, time }: DeboundProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      func();
    }, time);

    () => clearTimeout(timer);
  }, [time, func]);
  return;
};

export default useDebound;
