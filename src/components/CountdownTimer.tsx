import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // Launch date set to 90 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 90);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8 mb-12">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
      ].map((item, index) => (
        <div key={index} className="text-center">
          <div className="bg-gradient-to-br from-violet-500/20 to-green-500/20 backdrop-blur-sm border border-violet-500/30 rounded-lg p-4 min-w-[80px]">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              {item.value.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-2">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;