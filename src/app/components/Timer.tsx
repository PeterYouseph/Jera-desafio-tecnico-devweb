import { useEffect, useState } from "react";

export interface TimerProps {
  initialTime: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

export default function Timer({
  initialTime,
  isRunning,
  onTimeUp,
}: TimerProps) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && time > 0) {
      timer = setTimeout(() => setTime((prevTime) => prevTime - 1), 1000);
    }

    if (time === 0) {
      onTimeUp();
    }

    return () => clearTimeout(timer);
  }, [isRunning, time, onTimeUp]);

  return <>{time}</>;
}
