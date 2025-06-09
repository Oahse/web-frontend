import React, { useEffect, useRef, useState } from 'react';

const CountDownTimer = ({ starttime=Date.now(),labels = ['Days', 'Hours', 'Mins', 'Secs'], visibleLabels = ['d', 'h', 'm'] }) => {
    
    const endTimeRef = useRef(Date.now() +starttime);

    const calculateTimeLeft = () => {
        const now = Date.now();
        const timeRemaining = endTimeRef.current - now;

        if (timeRemaining <= 0) return null;

        const totalSeconds = Math.floor(timeRemaining / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        return { days, hours, mins, secs };
    };

    const [values, setValues] = useState(calculateTimeLeft());

    useEffect(() => {
      if (!values) return;

      const interval = setInterval(() => {
        const newValues = calculateTimeLeft();
        if (!newValues) {
          clearInterval(interval);
          setValues(null);
          const event = new Event('countDownFinished');
          window.dispatchEvent(event);
          return;
        }
        setValues(newValues);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    if (!values) return null;

    const pad = (num) => String(num).padStart(2, '0');

    return (
      <div className="countdown__timer" aria-hidden="true" data-timer={starttime/1000} data-labels="Days,Hours,Mins,Secs">
        {(values.days > 0 || visibleLabels.includes('d')) && (
          <span className="countdown__item">
            <span className="countdown__value countdown__value--0">{values.days}</span>
            <span className="countdown__label">{labels[0]}</span>
          </span>
        )}
        {(values.days > 0 || values.hours > 0 || visibleLabels.includes('h')) && (
          <span className="countdown__item">
            <span className="countdown__value countdown__value--1">{pad(values.hours)}</span>
            <span className="countdown__label">{labels[1]}</span>
          </span>
        )}
        {(values.days > 0 || values.hours > 0 || values.mins > 0 || visibleLabels.includes('m')) && (
          <span className="countdown__item">
            <span className="countdown__value countdown__value--2">{pad(values.mins)}</span>
            <span className="countdown__label">{labels[2]}</span>
          </span>
        )}
        <span className="countdown__item">
          <span className="countdown__value countdown__value--3">{pad(values.secs)}</span>
          <span className="countdown__label">{labels[3]}</span>
        </span>
      </div>
    );
};

export default CountDownTimer;
