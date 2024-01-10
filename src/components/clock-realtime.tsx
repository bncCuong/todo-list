'use client';

import { Calendar, Clock } from 'lucide-react';
import Calender from './calender';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const ClockRealTime = () => {
  const calendarRef = useRef<ElementRef<'div'>>(null);
  const [dateState, setDateState] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  useOnClickOutside(calendarRef, () => {
    setShowCalendar(false);
  });

  const showCalendarHanler = () => {
    setShowCalendar((prev) => !prev);
  };

  return (
    <div className="flex items-center hidden md:flex relative justify-center">
      <Calendar
        className="w-4 h-4 text-neutral-600 ml-13 hover:cursor-pointer hover:text-neutral-900 hover:scale-105"
        onClick={showCalendarHanler}
      />
      {showCalendar && (
        <div ref={calendarRef} className="absolute top-[30px] right-[120px] ">
          <Calender />
        </div>
      )}
      <p className="underline text-lg font-semibold  ml-1 mr-2">
        {dateState.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
      <Clock className="w-4 h-4  text-neutral-600 mx-1" />
      <p className="underline text-lg font-semibold ">
        {dateState.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </p>
    </div>
  );
};

export default ClockRealTime;
