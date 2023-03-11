import React from "react"; //Import do React para utilizar o pacote do React-Icons.
import { GiAlarmClock } from "react-icons/gi"; //Import do React-Icons e o ícone utilizado no componente.

type CircularProgressProps = {
  //Define o tipo das props necessárias para o componente CirularProgress.
  progress: number;
  radius: number;
};

//Define o componente CirularProgress, recebendo as props definidas na interface: progresso do tiemr e raio do mesmo.
const CircularProgress = ({ progress, radius }: CircularProgressProps) => {
  const circumference = 2 * Math.PI * radius; //Const que realiza o cálculo da circunferência do círculo.
  const strokeDashoffset = circumference - (progress / 100) * circumference; //Const que utiliza o cálculo da circunferência para elaborar a borda do progresso.

  //Return do componente, indicando o progresso do timer de Pomodoro, com um ícone decorativo no centro do círculo.
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
