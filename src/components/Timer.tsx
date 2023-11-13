import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Timer(props: any) {
  const targetTime = props.timer > 0 ? props.timer : 0;
  const [remainingTime, setRemainingTime] = useState(targetTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime: any) => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function hours(milliseconds: any) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, "0")}`;
  }

  function minutes(milliseconds: any) {
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes.toString().padStart(2, "0")}`;
  }

  function seconds(milliseconds: any) {
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="flex gap-1 font-bold items-center justify-center">
      {hours(remainingTime)}
      <span>:</span>
      {minutes(remainingTime)}
      <span>:</span>
      {seconds(remainingTime)}
    </div>
  );
}
