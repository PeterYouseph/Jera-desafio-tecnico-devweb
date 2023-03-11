import React from "react";
import { GiAlarmClock } from "react-icons/gi";

type CircularProgressProps = {
  progress: number;
  radius: number;
};

const CircularProgress = ({ progress, radius }: CircularProgressProps) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // calcular o ponto no círculo para o ícone

  const iconPositionY =
    radius +
    (radius - 100) * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2);

  return (
    <svg className="w-60 h-60">
      <circle
        stroke="none"
        strokeWidth="4"
        fill="#FF7373"
        r={radius}
        cx="50%"
        cy="50%"
      />
      <circle
        stroke="#6A0808"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        r={radius}
        cx="50%"
        cy="50%"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: `${strokeDashoffset}`,
        }}
      />
      <g transform={`translate(${72}, ${72})`}>
        <GiAlarmClock className="text-8xl text-white" />
      </g>
    </svg>
  );
};

export default CircularProgress;
